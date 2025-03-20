import { BiLogOut, BiNotification, BiSolidUser } from "react-icons/bi";
import { BsHouseFill } from "react-icons/bs";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./sidebar-tweet-button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const {data:currentUser} = useCurrentUser()
  const items = [
    {
      label: "Notification",
      href: "/notification",
      icon: BiNotification,
      auth: true,
    },
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
      auth: false,
    },
    {
      label: "Profile",
      href:`/users/${currentUser?.id}`,
      icon: BiSolidUser,
      auth: true,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              href={item.href}
              key={item.href}
              label={item.label}
              icon={item.icon}
              auth={item?.auth}
            />
          ))}
          {currentUser && (
            <SidebarItem
              auth={false}
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
