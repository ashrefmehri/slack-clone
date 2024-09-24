"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { UseCurrentUser } from "../api/use-current-user"
import { Loader, LogOut } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"
import { useCreateWorkspaceModal } from "../../workspaces/store/use-create-workspace-modal"
import { useRouter } from "next/navigation"
  

export const UserButton = () => {

    const [_open,setOpen] = useCreateWorkspaceModal()

    const {user, isLoading} = UseCurrentUser()
    if (isLoading) return <Loader className="animate-spin size-4 text-muted-foreground"/>
    if (!user) return null

    const {name,image} = user
    const avatarFallback = name!.at(0)?.toUpperCase() 
    const router = useRouter()
    const {signOut} = useAuthActions()

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="cursor-pointer outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage  src={image} alt={name} />
                    <AvatarFallback>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={()=>{signOut(),router.replace("/")}}>
                <LogOut className="size-4 mr-2" />
                    <span>LogOut</span>

                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
  }
