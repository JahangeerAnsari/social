import Header from "@/components/header"
import useUser from "@/hooks/useUser";
import {ClipLoader} from "react-spinners";
import { useRouter } from "next/router";
import { useState } from "react";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";

const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const { data: fetchedUser, isLoading } = useUser(userId as string);
    if (isLoading || !fetchedUser) {
        return (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80} />
          </div>
        );
     }
    return (
      <>
        <Header showBackArrow label={fetchedUser?.name} />
        <UserHero userId={userId as string} />
        <UserBio  userId={userId as string} />
      </>
    );
}
export default UserView;