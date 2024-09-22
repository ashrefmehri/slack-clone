import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/app/features/workspaces/api/use-get-workspaces";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateWorkspaceModal } from "@/app/features/workspaces/store/use-create-workspace-modal";

const WorkSpaceSwitcher = () => {
  const [_open, setOpen] = useCreateWorkspaceModal();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { workspace, isLoading: isLoadingWorkspace } = useGetWorkspace({
    workspaceId,
  });
  const { workspaces, isLoading: isLoadingWorkspaces } = useGetWorkspaces();
  const filtredWorkspaces = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="size-9  relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {isLoadingWorkspace ? (
            <Loader className="animate-spin size-5 shrink-0" />
          ) : (
            workspace?.name?.at(0)?.toUpperCase() || "W"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className="cursor-pointer flex-col items-start justify-start capitalize"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        {filtredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            onClick={() => router.push(`/workspace/${workspace._id}`)}
            className="cursor-pointer overflow-hidden capitalize"
          >
            <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white  text-lg rounded-md  mr-2 flex items-center justify-center font-semibold">
              {workspace.name.at(0)?.toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => setOpen(true)}
          className="cursor-pointer "
        >
          <div className="shrink-0 size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800  text-lg rounded-md  mr-2 flex items-center justify-center font-semibold">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default WorkSpaceSwitcher;
