import { NextResponse } from 'next/server';
import { databases, storage } from '@/lib/appwriteClient';
import { Query } from 'appwrite';

// Revalidate this route every 60 seconds
export const revalidate = 60;

export async function GET() {
    try {
        const DATABASE_ID = 'gdg_usar';
        const TEAM_COLLECTION_ID = 'teams';
        const PROFILE_IMAGES_BUCKET_ID = 'team';

        // Fetch documents from the 'team_members' collection
        // We only want to fetch members who are currently 'active'
        const response = await databases.listDocuments(
            DATABASE_ID,
            TEAM_COLLECTION_ID,
            [Query.equal('status', 'active')] // This is how you filter!
        );

        // For each team member, get the public URL for their profile image
        const teamWithImages = await Promise.all(
            response.documents.map(async (member) => {
                let imageUrl = '';
                if (member.profileImageId) {
                    // getFilePreview is the method to get a public URL
                    imageUrl = storage.getFilePreview(
                        PROFILE_IMAGES_BUCKET_ID,
                        member.profileImageId
                    );
                }
                return {
                    ...member,
                    imageUrl, // Add the new imageUrl property
                };
            })
        );
        
        return NextResponse.json(teamWithImages);

    } catch (error) {
        console.error("Error fetching team members:", error);
        return new NextResponse("Error fetching team members", { status: 500 });
    }
}