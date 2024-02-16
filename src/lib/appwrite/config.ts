import { Client, Account, Databases, Storage, Avatars } from "appwrite";
// type configType={
//   url: string,
//   projectId: string,
//   databaseId: string,
//   storageId: string,
//   userCollectionId: string,
//   parkingCollectionId: string,
//   vehicleInAndOutCollectionId: string,
// }

export const appwriteConfig= {
  url: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  // storageId: process.env.NEXT_APPWRITE_STORAGE_ID,
  userCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID),
  // parkingCollectionId: process.env.NEXT_APPWRITE_PARKING_COLLECTION_ID,
  // vehicleInAndOutCollectionId: process.env.NEXT_APPWRITE_VEHICLES_IN_AND_OUT_COLLECTION_ID,
};
console.log(appwriteConfig.url);
export const client = new Client();

// client.setEndpoint(appwriteConfig.url);
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
