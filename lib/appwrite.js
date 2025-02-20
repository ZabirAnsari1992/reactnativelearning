import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '6794ba0100088034a553',
  databaseId: '679f12a70013384d48be',
  usersCollectionId: '679f130100061c6e02cd',
  videosCollectionId: '679f136c000ff3dd6b4a',
  storageId: '679f1a030023cefd12b7'
};

// Initialize Appwrite SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    // Create a new account
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw new Error("Account creation failed");

    // Get user avatar
    const avatarUrl = avatars.getInitials(username);

    // Sign in after account creation
    await SignIn(email, password);

    // Save user details in the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error.message || "Failed to create user");
  }
};

export const SignIn = async (email, password) => {
  try {
    // Check if a session already exists
    let currentAccount;
    try {
      currentAccount = await account.get();
    } catch (error) {
      console.log("No active session found, proceeding with login.");
    }

    if (currentAccount) {
      console.log("User is already logged in:", currentAccount);
      return currentAccount; // Return the current session instead of creating a new one
    }

    // If no session exists, proceed with login
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error in SignIn:", error);
    throw new Error(error.message || "Failed to sign in");
  }
};


export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No active session found");

    // Fetch user data from the database
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser.documents.length) throw new Error("User not found in database");

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw new Error(error.message || "Failed to get current user");
  }
};
