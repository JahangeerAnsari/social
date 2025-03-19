import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../avatar";
import UserBio from "./UserBio";
interface UserHeroProps{
    userId:string
}
const UserHero = ({ userId }: UserHeroProps) => {
    const {data:fetchedUser} = useUser(userId)
    return (
      <div>
        <div className="bg-neutral-700 h-44 relative">
          {fetchedUser.coverImage && (
            <Image
              src={fetchedUser?.coverImage}
              fill
              alt="coverimage"
              style={{ objectFit: "cover" }}
            />
          )}
          <div className="absolute -bottom-16 left-4">
            <Avatar userId={userId} isLarge hasborder />
            
          </div>
        </div>
      </div>
    );
};
 
export default UserHero;