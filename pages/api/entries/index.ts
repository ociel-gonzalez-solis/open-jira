import { dataBase } from "@/database";
import { Entry, IEntry } from "@/models";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | { message: string }
  | IEntry[]
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Endpoint no existe" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await dataBase.connect();
  const entries = await Entry.find().sort({ createdAt: "asc" });

  await dataBase.disconnect();

  return res.status(StatusCodes.OK).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '' } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await dataBase.connect();
    await newEntry.save();
    await dataBase.disconnect();

  return res.status(StatusCodes.CREATED).json(newEntry);
  } catch (error) {
    await dataBase.disconnect();
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Algo salío mal'
    });
  }
}
