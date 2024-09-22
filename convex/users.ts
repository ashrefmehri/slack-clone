import {auth} from './auth'
import { query } from './_generated/server'

export const currentUser = query({
    args: {},
   handler : async (ctx) => {
    const userId = await auth.getUserId(ctx)
       if (userId === null) {
        return null
       }
       const user = await ctx.db.get(userId)
       return user
   },
}) 
