"use client"
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react"

export default function Home() {
  const {signOut} = useAuthActions()
  return (
    <div className="">
      <h1>lekmkldfvm</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
