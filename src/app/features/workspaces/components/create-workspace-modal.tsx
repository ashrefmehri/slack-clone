'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle , DialogDescription} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../../auth/api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export const WorkSpaceModal = () => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useCreateWorkspaceModal()
    const [name,setName] = useState<string>('')

    const {mutate , isLoading} = useCreateWorkspace()
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({name},{
        onSuccess: (data) => {
            toast.success('Workspace created successfully')
            router.push(`/workspace/${data}`)
            handleClose()
        }
      })
    }
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                 <Input
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 disabled={isLoading}
                  placeholder="Workspace Name e.g. 'home' , 'school' , 'work' " 
                  required
                   autoFocus
                   minLength={3}
                  />
                  <div className="flex justify-end">
                    <Button disabled={isLoading} type="submit">Create</Button>
                  </div>
                </form>
            </DialogContent>

        </Dialog>
    )
}
