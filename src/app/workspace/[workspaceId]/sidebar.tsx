import { UserButton } from "@/app/features/auth/components/user-button"
import WorkSpaceSwitcher from "./workspace-switcher"
import { SidebarButton } from "./sidebar-button"
import { BellIcon, Home, MessageSquare, MoreHorizontal } from "lucide-react"

const sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] pb-4 flex flex-col items-center pt-[9px] gap-y-4">
   <WorkSpaceSwitcher/>
   <SidebarButton icon={Home} label="Home" isActive/>
   <SidebarButton icon={MessageSquare} label="DMs"/>
   <SidebarButton icon={BellIcon} label="Activity" />
   <SidebarButton icon={MoreHorizontal} label="More" />

<div className=" flex flex-col items-center justify-center gap-y-1 mt-auto  ">
    <UserButton/>
</div>
    </aside>
  )
}

export default sidebar