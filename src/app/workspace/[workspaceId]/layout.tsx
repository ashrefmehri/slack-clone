'use client'

import Sidebar from "./sidebar"
import { Toolbar } from "./toolbar"

interface WorkSpaceLayoutProps {
    children: React.ReactNode
}
const WorkSpaceLayout = ({children}:WorkSpaceLayoutProps) => {
  return (
    <div className="h-full">
        <Toolbar />
        <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
        </div>
   </div>
  )
}

export default WorkSpaceLayout