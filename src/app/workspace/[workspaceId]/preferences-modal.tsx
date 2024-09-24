import { useRemoveWorkspace } from "@/app/features/workspaces/api/use-remove-workspaces"
import { useUpdateWorkspace } from "@/app/features/workspaces/api/use-update-workspace"
import { useConfirm } from "@/app/hooks/use-confirm"
import { useWorkspaceId } from "@/app/hooks/use-workspace-id"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


interface PreferencesModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialValue: string
}


export const PreferencesModal = ({open, setOpen, initialValue}:PreferencesModalProps) => {
    const [value, setValue] = useState(initialValue)
    const [editOpen, setEditOpen] = useState(false)
    const [ConfirmDialog,confirm] = useConfirm('Delete Workspace','Are you sure you want to delete this workspace?')
    const workspaceId = useWorkspaceId()
    const  router = useRouter()

    const {mutate:updateWorkspace, isLoading:isUpdatingWorkspace} = useUpdateWorkspace()
    const {mutate:removeWorkspace, isLoading:isRemovingWorkspace} = useRemoveWorkspace()


    const handleEdit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateWorkspace({workspaceId:workspaceId, name:value},{
            onSuccess:()=>{
                toast.success('Workspace name updated successfully')
                setEditOpen(false)
            },
            onError:(error)=>{
                toast.error('Failed to update workspace name')
            },
        })
    }


    const handleDelete = async () => {
        const confirmed = await confirm()
        if(!confirmed) return
        removeWorkspace({workspaceId:workspaceId},{
            onSuccess:()=>{
                toast.success('Workspace deleted successfully')
                setOpen(false)
                router.replace('/')
            },
            onError:(error)=>{
                toast.error('Failed to delete workspace')
            },
        })
    }
    return (
        <>
        <ConfirmDialog/>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader  className="p-4 border-b bg-white">
                {value}
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                    
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Workspace Name</p>
                        <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
                    </div>
                    <p className="text-sm ">
                        {value}
                    </p>
                </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader  className="p-4 border-b bg-white">
                        <DialogTitle>Edit Workspace Name</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleEdit}>
                       <Input
                        value={value}
                        disabled={isUpdatingWorkspace}
                        onChange={(e)=>setValue(e.target.value)}
                        required
                        minLength={3}
                        maxLength={80}
                        placeholder="Workspace name e.g. 'Work' , 'Personal','Home'"

                       ></Input>
                       <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline' disabled={isUpdatingWorkspace}>
                               Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isUpdatingWorkspace} type="submit">Save</Button>
                       </DialogFooter>
                    </form>
                </DialogContent>
                </Dialog>
                <button disabled={false}
                onClick={handleDelete}
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
                >
            <TrashIcon className="size-4"/>
            <p className="text-sm font-semibold">Delete Workspace</p> 
                </button>
            </div>
          </DialogContent>
        </Dialog>
        </>
    )
}