"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

interface HintProps {
    children: React.ReactNode
    side?: "top" | "bottom" | "left" | "right"
    label: string
    align?: "start" | "center" | "end"
}

export const Hint = ({children, side, label, align}: HintProps) => {
    return(
        <TooltipProvider >  
            <Tooltip>
        <TooltipTrigger asChild>
            {children}
            </TooltipTrigger> 
            <TooltipContent side={side} align={align} className="bg-black text-white border-white/5">
                <p className="font-medium capitalize text-xs">
                {label}
                </p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
    
