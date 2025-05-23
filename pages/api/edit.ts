import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from '@/lib/prismadb'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: any
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res,authOptions);
    const { name, username, bio, profileImage, coverImage } = req.body;
    if (!name || !username) {
      throw new Error("Missing fields");
    }
    const updateDetails = await prismadb.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });
    return res.status(200).json(updateDetails);
  } catch (error) {
    console.log("edit error", error);
  }
}
