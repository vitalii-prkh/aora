import {
  Client,
  Account,
  Avatars,
  TablesDB,
  Storage,
  ID,
  Query,
} from "react-native-appwrite";
import * as DocumentPicker from "expo-document-picker";
import {arrayBufferToString} from "../utils/arrayBufferToString";

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
const storage = new Storage(client);

type TUserData = {
  email: string;
  password: string;
  username: string;
};

export async function createUser(data: TUserData) {
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

type TLoginData = {
  email: string;
  password: string;
};

export async function signIn(data: TLoginData) {
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

export async function getAllPosts() {
  try {
    const posts = await tables.listRows({
      databaseId: config.databaseId,
      tableId: config.videosCollectionId,
      queries: [Query.select(["*", "creator.*"])],
    });

    return posts.rows;
  } catch (error) {
    console.log("[getAllPosts]: ", error);
    throw error;
  }
}

export async function getLatestPosts() {
  try {
    const posts = await tables.listRows({
      databaseId: config.databaseId,
      tableId: config.videosCollectionId,
      queries: [
        Query.orderDesc("$createdAt"),
        Query.limit(7),
        Query.select(["*", "creator.*"]),
      ],
    });

    return posts.rows;
  } catch (error) {
    console.log("[getLatestPosts]: ", error);
    throw error;
  }
}

export async function getPostsByQuery({query}: {query: string}) {
  try {
    const posts = await tables.listRows({
      databaseId: config.databaseId,
      tableId: config.videosCollectionId,
      queries: query
        ? [Query.search("title", query), Query.select(["*", "creator.*"])]
        : [Query.select(["*", "creator.*"])],
    });

    return posts.rows;
  } catch (error) {
    console.log("[getLatestPosts]: ", error);
    throw error;
  }
}

export async function getPostsByUserId({userId}: {userId: string}) {
  try {
    const posts = await tables.listRows({
      databaseId: config.databaseId,
      tableId: config.videosCollectionId,
      queries: [
        Query.equal("creator", userId),
        Query.select(["*", "creator.*"]),
      ],
    });

    return posts.rows;
  } catch (error) {
    console.log("[getLatestPosts]: ", error);
    throw error;
  }
}

export async function signOut() {
  try {
    return await account.deleteSession({sessionId: "current"});
  } catch (error) {
    console.log("[signOut]: ", error);
  }
}

type TForm = {
  title: string;
  thumbnail: DocumentPicker.DocumentPickerAsset;
  video: DocumentPicker.DocumentPickerAsset;
  prompt: string;
  userId: string;
};

export async function createVideoPost(form: TForm) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await tables.createRow({
      databaseId: config.databaseId,
      tableId: config.videosCollectionId,
      rowId: ID.unique(),
      data: {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      },
    });

    return newPost;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(
  file: DocumentPicker.DocumentPickerAsset,
  type: "image" | "video",
) {
  if (!file) {
    return;
  }

  try {
    const uploadedFile = await storage.createFile({
      bucketId: config.storageId,
      fileId: ID.unique(),
      file: {
        name: file.name,
        type: file.mimeType!,
        size: file.size!,
        uri: file.uri,
      },
    });

    return await getFilePreview(uploadedFile.$id, type);
  } catch (error) {
    throw error;
  }
}

export async function getFilePreview(fileId: string, type: "image" | "video") {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView({bucketId: config.storageId, fileId});
    } else if (type === "image") {
      fileUrl = storage.getFilePreview({
        bucketId: config.storageId,
        fileId,
        width: 2000,
        height: 2000,
        quality: 100,
        borderWidth: 100,
      });
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) {
      throw new Error("File url is not available.");
    }

    return fileUrl;
  } catch (error) {
    throw error;
  }
}
