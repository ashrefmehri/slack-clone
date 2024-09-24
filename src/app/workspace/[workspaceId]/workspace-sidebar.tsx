import { useCurrentMember } from "@/app/features/members/api/use-current-member"
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace"
import { useWorkspaceId } from "@/app/hooks/use-workspace-id"
import { AlertTriangle, Loader } from "lucide-react"
import { WorkspaceHeader } from "./workspace-header"

export const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId()
    const {data:member , isLoading:memberLoading} = useCurrentMember({workspaceId})
    const {workspace:workspace , isLoading:workspaceLoading} = useGetWorkspace({workspaceId})
    
    
if (memberLoading || workspaceLoading) {
return (
        <div className="flex flex-col bg-[#5E2C5F] items-center justify-center h-full">
            <Loader className="animate-spin size-5 text-white"/>
        </div>
    )
}
 if (!workspace || !member){
    return (
        <div className="flex flex-col space-y-2 bg-[#5E2C5F] items-center justify-center h-full">
            <AlertTriangle className=" size-5 text-white"/>
            <span className="text-white text-sm">You are not a member of this workspace</span>
        </div>
    )
}

    return (
        <div className="flex flex-col  bg-[#5E2C5F] h-full">
     <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"}/>
        </div>

    )
}