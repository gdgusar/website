import { NextResponse } from 'next/server';
import { databases, storage } from '@/lib/appwriteClient';
import { Query } from 'appwrite';

// Revalidate this route every 60 seconds
export const revalidate = 60;

export async function GET() {
    try {
        const DATABASE_ID = 'gdg_usar';
        const EVENTS_COLLECTION_ID = 'events';
        const EVENT_IMAGES_BUCKET_ID = 'event';

        // Fetch documents from the 'events' collection
        // You can filter by status, e.g., [Query.equal('status', 'upcoming')] for upcoming events
        const response = await databases.listDocuments(
            DATABASE_ID,
            EVENTS_COLLECTION_ID,
            [] // No filter to get all events, or add Query.equal('status', 'upcoming')
        );

        // For each event, get the public URL for the featured image
        const eventsWithImages = await Promise.all(
            response.documents.map(async (event) => {
                let imageUrl = '';
                if (event.featuredImageId) {
                    // getFilePreview is the method to get a public URL
                    imageUrl = storage.getFilePreview(
                        EVENT_IMAGES_BUCKET_ID,
                        event.featuredImageId
                    );
                }
                return {
                    ...event,
                    imageUrl, // Add the new imageUrl property
                };
            })
        );

        return NextResponse.json(eventsWithImages);

    } catch (error) {
        console.error("Error fetching events:", error);
        return new NextResponse("Error fetching events", { status: 500 });
    }
}