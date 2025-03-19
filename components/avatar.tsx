import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps{
    userId: string;
    isLarge?: boolean;
    hasborder?: boolean;
}
const Avatar = ({ userId, hasborder, isLarge }: AvatarProps) => {
     const router  = useRouter()
    const { data: fetchedUser } = useUser(userId);
    const onClick = useCallback((event: any) => {
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
     },[router, userId])
    return (
      <div
        className={`
         ${hasborder ? "border-4 border-black" : ""}
         ${isLarge ? "h-32" : "h-12"}
         ${isLarge ? "w-32" : "w-12"}
         rounded-full
         hover:opacity-90
         cursor-pointer
         relative
         transition
         bg-red-500
        `}
            
      >
        <Image
          fill
          style={{
            objectFit: 'cover',
            borderRadius: '100%',
          }}
          alt="Angry"
          onClick={onClick}
          src={fetchedUser?.profileImage || "/images/angry.png"}
        />
      </div>
    );
}
 
export default Avatar;