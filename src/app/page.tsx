"use client"
import { useMemo, useEffect } from "react"
import { UserButton } from "./features/auth/components/user-button"
import { useGetWorkspaces } from "./features/workspaces/api/use-get-workspaces"
import { useCreateWorkspaceModal } from "./features/workspaces/store/use-create-workspace-modal"
import { useRouter } from "next/navigation"
export default function Home() {

  const [isOpen, setIsOpen] = useCreateWorkspaceModal()

  const {workspaces, isLoading} = useGetWorkspaces()
  const workspaceId = useMemo(()=>workspaces?.[0]?._id,[workspaces])
const router = useRouter()

  useEffect(()=>{
   if (isLoading) {
    return 
  } 
  if (workspaceId) {
    router.replace(`/workspace/${workspaceId}`)
  }
  else if(!isOpen) {
    setIsOpen(true)
  }
   } ,[workspaceId,isLoading, isOpen, setIsOpen, router])
  return (
    <div className="">
      <UserButton/>
    </div>
  );
}
