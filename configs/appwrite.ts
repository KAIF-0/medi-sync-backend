import { Client, Storage } from "appwrite";

export const client = new Client();
client.setProject(Bun.env.APPWRITE_PROJECT_ID as string);

export const storage = new Storage(client);
