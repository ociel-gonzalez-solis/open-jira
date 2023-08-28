import { dataBase } from "@/database";
import { Entry, IEntry } from "@/models";
import { HttpStatusCode } from "axios";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query;
    if (!mongoose.isValidObjectId(id)) {
        return res
            .status(HttpStatusCode.BadRequest)
            .json({ message: "Invalid Id " + id });
    }

    switch (req.method) {
        case "PUT":
            return updateEntry(req, res);

        case "GET":
            return getEntry(req, res);

        default:
            return res
                .status(HttpStatusCode.BadRequest)
                .json({ message: "Invalid method" });
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await dataBase.connect();

    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate)
        return res
            .status(HttpStatusCode.BadRequest)
            .json({ message: "No object with Id " + id });

    const {
        description = entryToUpdate.description,
        status      = entryToUpdate.status,
    } = req.body;

    const createdAt = new Date();

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            id,
            {
                description,
                status,
                createdAt
            },
            {
                runValidators: true,
                new: true,
            }
        );
        await dataBase.disconnect();

        res.status(StatusCodes.OK).json(updatedEntry!);
    } catch (error: any) {
        console.log(error);
        return res
            .status(HttpStatusCode.BadRequest)
            .json({ message: error.errors.status.message });
    }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await dataBase.connect();
    const entryById = await Entry.findById(id);
    await dataBase.disconnect();

    if (!entryById)
        return res
            .status(HttpStatusCode.BadRequest)
            .json({ message: "No object with Id " + id });

    res.status(StatusCodes.OK).json(entryById);
};
