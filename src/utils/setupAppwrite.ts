import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { Client, Databases, Storage, ID, Permission, Role, AppwriteException, IndexType } from 'node-appwrite';

// --- Appwrite Client Initialization ---
const client = new Client();
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

// --- Schema Definition ---
const DATABASE_ID = 'gdg_usar';
const EVENTS_COLLECTION_ID = 'events';
const TEAM_COLLECTION_ID = 'teams';
const EVENT_IMAGES_BUCKET_ID = 'event';
const PROFILE_IMAGES_BUCKET_ID = 'team';


async function resourceExists(check) {
    try {
        await check;
        return true;
    } catch (e) {
        if (e instanceof AppwriteException && e.code === 404) {
            return false;
        }
        // Re-throw any other unexpected errors
        throw e;
    }
}

async function setupDatabase() {
    console.log('Checking for database...');
    if (await resourceExists(databases.get(DATABASE_ID))) {
        console.log('🔶 Database already exists. Skipping creation.');
    } else {
        console.log('Database not found. Creating...');
        await databases.create(DATABASE_ID, 'GDG USAR Content');
        console.log('✅ Database created successfully.');
    }
}

async function setupStorageBuckets() {
    console.log('Checking for storage buckets...');
    const bucketsToCreate = [
        { id: EVENT_IMAGES_BUCKET_ID, name: 'Event Images' },
        { id: PROFILE_IMAGES_BUCKET_ID, name: 'Profile Images' },
    ];

    for (const bucket of bucketsToCreate) {
        if (await resourceExists(storage.getBucket(bucket.id))) {
            console.log(`🔶 Bucket '${bucket.name}' already exists. Skipping.`);
        } else {
            console.log(`Bucket '${bucket.name}' not found. Creating...`);
            await storage.createBucket(
                bucket.id,
                bucket.name,
                [Permission.read(Role.any())],
                false, undefined, undefined, ['jpg', 'jpeg', 'png', 'webp']
            );
            console.log(`✅ Bucket '${bucket.name}' created successfully.`);
        }
    }
}


async function setupTeamMembersCollection() {
    console.log("\n--- Setting up 'Team Members' Collection ---");
    
    // Try to create collection
    try {
        await databases.createCollection(DATABASE_ID, TEAM_COLLECTION_ID, 'Teams', [Permission.read(Role.any())]);
        console.log("✅ 'Team Members' collection created.");
    } catch (e) {
        if (e instanceof AppwriteException && e.code === 409) {
            console.log("🔶 'Team Members' collection already exists.");
        } else {
            throw e;
        }
    }

    // Now create attributes, even if collection exists
    console.log("Creating attributes for 'Team Members'...");
    const attributes = [
        () => databases.createStringAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'name', 255, true),
        () => databases.createEnumAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'designation', ['organizer', 'lead', 'coLead', 'member'], true),
        () => databases.createIntegerAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'joinedgdgusar', false, 2020, 2099),
        () => databases.createEnumAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'branch', ['iiot', 'aiml', 'ai-ds', 'ar'], true),
        () => databases.createIntegerAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'startYear', true, 2000, 2099),
        () => databases.createIntegerAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'endYear', false, 2000, 2099),
        () => databases.createEnumAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'chapterName', ['webdev', 'dsa', 'aiml', 'cybersec', 'marketing', 'eventManagement', 'designTeam'], false),
        () => databases.createStringAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'profileImageId', 255, true), // Stores File ID from Storage
        () => databases.createUrlAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'linkedin', false),
        () => databases.createUrlAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'github', false),
        () => databases.createEnumAttribute(DATABASE_ID, TEAM_COLLECTION_ID, 'status', ['active', 'alumni'], false, 'active'), // Default to 'active'
    ];

    for (const createAttr of attributes) {
        try {
            await createAttr();
        } catch (e) {
            if (e instanceof AppwriteException && e.code === 409) {
                // Attribute already exists, skip
            } else {
                throw e;
            }
        }
    }
    console.log("✅ All attributes for 'Team Members' ensured.");
}

async function setupEventsCollection() {
    console.log("\n--- Setting up 'Events' Collection ---");
    try {
        await databases.createCollection(DATABASE_ID, EVENTS_COLLECTION_ID, 'Events', [Permission.read(Role.any())]);
        console.log("✅ 'Events' collection created.");

        console.log("Creating attributes for 'Events'...");
        await Promise.all([
            databases.createStringAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'title', 255, true),
            databases.createStringAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'slug', 255, true), // For SEO-friendly URLs
            databases.createStringAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'description', 10000, true),
            databases.createStringAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'featuredImageId', 255, false), // Stores File ID
            databases.createDatetimeAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'eventDate', true),
            databases.createStringAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'venue', 255, true),
            databases.createEnumAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'status', ['upcoming', 'past', 'cancelled'], true, 'upcoming'),
            databases.createEnumAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'eventType', ['workshop', 'talk', 'meetup', 'hackathon'], true),
            databases.createUrlAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'registrationLink', false),
            databases.createStringAttribute(DATABASE_ID, EVENTS_COLLECTION_ID, 'speakers', 255, false, undefined, true), // Relationship: Array of Team Member Document IDs
        ]);
        console.log("✅ All attributes for 'Events' created.");

        console.log("Creating index for 'slug' on 'Events' collection...");
        await databases.createIndex(DATABASE_ID, EVENTS_COLLECTION_ID, 'by_slug', IndexType.Key, ['slug']);
        console.log("✅ Index for 'slug' created.");

    } catch (e) {
        if (e instanceof AppwriteException && e.code === 409) {
            console.log("🔶 'Events' collection and attributes appear to already exist. Skipping.");
        } else {
            throw e; // Re-throw other errors
        }
    }
}


async function main() {
    console.log('🚀 Starting Appwrite schema setup...');
    try {
        await setupDatabase();
        await setupStorageBuckets();
        await setupTeamMembersCollection();
        await setupEventsCollection();
        console.log('\n🎉 Appwrite setup finished successfully!');
    } catch (error) {
        console.error("\n🛑 Setup failed with an unexpected error:", error);
    }
}

main();