import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    console.log("NOT GET METHOD RETURN");
    return res.status(405).end();
  }
    try {
        // structure [userId] ---> req.query
        const { userId } = req.query;
        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid Id')
        }
    const existingUser = await prisma.user.findUnique({  
        where: {
          id:userId
      }
    });
        // now find the followingIds of currrent login users
        const followingCount = await prisma.user.count({
            where: {
                followingIds: {
                    has:userId
                }
            }
        })
        return res.status(200).json({
            ...existingUser,
            followingCount
    });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR [Single User]", error);
    return res.status(500).end();
  }
}
