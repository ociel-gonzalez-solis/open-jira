import { isValidObjectId } from "mongoose";
import { dataBase } from ".";
import { Entry, IEntry } from "@/models";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
    if (!isValidObjectId(id)) return null;

    await dataBase.connect();
    const entry = await Entry.findById(id).lean();
    await dataBase.disconnect();

    return JSON.parse(JSON.stringify(entry));
}