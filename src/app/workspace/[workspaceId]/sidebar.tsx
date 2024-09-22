import { UserButton } from "@/app/features/auth/components/user-button"
import WorkSpaceSwitcher from "./workspace-switcher"

const sidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-[#481349] pb-4 flex flex-col items-center pt-[9px] gap-y-4">
<div>
   <WorkSpaceSwitcher/>
</div>
<div className=" flex flex-col items-center justify-center gap-y-1 mt-auto  ">
    <UserButton/>
</div>
    </aside>
  )
}

export default sidebar