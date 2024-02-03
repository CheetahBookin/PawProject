import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface HotelRequest extends Request {
  body: {
    name: string;
    location: string;
    price: number;
  };
}

