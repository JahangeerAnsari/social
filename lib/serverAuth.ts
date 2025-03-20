import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from '@/lib/prismadb'
const serverAuth = async (req: NextApiRequest, res: NextApiResponse, p0: null) => {
    const session = await getServerSession(req, res, authOptions); 
    
    if (!session?.user?.email) {
         throw new Error('Not singed in')
    }
    const currentUser = await prisma.user.findUnique({
        where: {
            email:session?.user?.email
        }
    })
   
    if (!currentUser) {
         throw new Error('Not signed In')
    }
    return {currentUser}
}
export default serverAuth;