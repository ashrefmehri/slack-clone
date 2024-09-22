import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) {
      throw new Error("Unauthorized")
    }
    const joinCode = "12345"
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      joinCode: joinCode,
      userId: userId,
    })
    return workspaceId
  }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
      return  await ctx.db.query("workspaces").collect()
    }

})

export const getById = query({
  args: {
    workspaceId: v.id("workspaces")
  },
  handler: async (ctx, args) => {
const userId = await auth.getUserId(ctx)
if(!userId){
  throw new Error("Unauthorized")
}
   return await ctx.db.get(args.workspaceId)
  }
})


