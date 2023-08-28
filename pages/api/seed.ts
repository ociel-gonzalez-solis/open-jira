import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { SeedData, dataBase } from "@/database";
import { Entry } from "@/models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No tiene acceso a este servicio" });
  }

  await dataBase.connect();

  await Entry.deleteMany();
  await Entry.insertMany(SeedData.entries); 

  await dataBase.disconnect();
  return res
    .status(StatusCodes.OK)
    .json({ message: "Proceso realziado correctamente" });
}
