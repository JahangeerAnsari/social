import { BiLogOut, BiNotification, BiSolidUser } from "react-icons/bi";
import { BsHouseFill } from "react-icons/bs";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./sidebar-tweet-button";

const Sidebar = () => {
  const items = [
    {
      label: "Notification",
      href: "/notification",
      icon: BiNotification,
    },
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Profile",
      href: "/",
      icon: BiSolidUser,
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
            />
          ))}
                  <SidebarItem onClick={() => { }} icon={BiLogOut} label="Logout" />
                  <SidebarTweetButton/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
