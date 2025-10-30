import {
  Client,
  Account,
  Avatars,
  TablesDB,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.prkh.aora",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_USERS,
  videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_VIDEOS,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE,
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const tables = new TablesDB(client);

export async function createUser(data) {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email: data.email,
      password: data.password,
      name: data.username,
    });

    if (!newAccount) {
      throw new Error("Failed to create user");
    }

    const avatarUrl = await avatars.getInitials({
      name: data.username,
      width: 80,
      height: 80,
    });

    await signIn({
      email: data.email,
      password: data.password,
    });

    return await tables.createRow({
      databaseId: config.databaseId,
      tableId: config.userCollectionId,
      rowId: ID.unique(),
      data: {
        accountId: newAccount.$id,
        email: newAccount.email,
        username: data.username,
        avatar: arrayBufferToString(avatarUrl),
      },
    });
  } catch (error) {
    console.log("[createUser]: ", error);
    throw error;
  }
}

export async function signIn(data) {
  try {
    return await account.createEmailPasswordSession({
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    console.log("[signIn]: ", error);
    throw error;
  }
}

export async function getUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("Failed to get user");
    }

    const currentUser = await tables.listRows({
      databaseId: config.databaseId,
      tableId: config.userCollectionId,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });

    if (!currentUser) {
      throw new Error("Failed to get user");
    }

    return currentUser.rows[0];
  } catch (error) {
    console.log("[getUser]: ", error);
    throw error;
  }
}

function arrayBufferToString(arrayBuffer, encoding = "utf-8") {
  const uint8Array = new Uint8Array(arrayBuffer);
  const decoder = new TextDecoder(encoding);

  return decoder.decode(uint8Array);
}
