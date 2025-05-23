import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: any
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res, authOptions);
        const { body } = req.body;
        console.log("body api",body);
        
      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });
      return res.status(201).json(post);
      }
      if (req.method === 'GET') {
          const { userId } = req.query;
          let posts;
          if (userId && typeof userId === 'string') {
              posts = await prisma.post.findMany({
                  where: {
                      userId
                  },
                  include: {
                      comments:true,
                      user:true
                  },
                  orderBy: {
                      createdAt:'desc'
                  }
              })
          } else {
              posts = await prisma.post.findMany({
                  include: {
                      user: true,
                      comments:true
                  },
                  orderBy: {
                      createdAt:'desc'
                  }
              })
          }
          return res.status(200).json(posts);
      }
      
  } catch (error) {
    console.log("[POST API ERROR]", error);
  }
}
