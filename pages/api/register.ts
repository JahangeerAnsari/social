import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.log("NOT POST METHOD RETURN");
    return res.status(405).end();
  }

  try {
    const { email, password, username, name } = req.body;

    if (!email || !password || !username || !name) {
      return res.status(400).json({ error: "All fields are required." });
    }
     const existingUser = await prisma.user.findUnique({
       where: { email },
     });

     if (existingUser) {
       return res.status(400).json({ error: "Email is already in use" });
     }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        hashedPassword, // ✅ matches the field in your Prisma schema
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error:any) {
      console.error("INTERNAL SERVER ERROR:", error);
      return res
        .status(500)
        .json({ error: error.message || "Internal Server Error" });

  }
}
