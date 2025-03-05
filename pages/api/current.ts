import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    console.log("NOT GET METHOD RETURN");
    return res.status(405).end();
  }
  try {
      const { currentUser } = await serverAuth(req);
      return  res.status(200).json(currentUser)
    
  } catch (error) {
    console.log("INTERNAL SERVER ERROR", error);
    return res.status(500).end();
  }
}
