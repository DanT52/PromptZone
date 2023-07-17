//patch

import { connectToDB } from "@utils/database";
import User from '@models/user'
import Prompt from "@models/prompt";


export const PATCH = async (request, { params }) => {
    const { userId, postId } = await request.json()

    try {
        await connectToDB()

        const user = await User.findById(userId)
        const post = await Prompt.findById(postId)
        


        if(!user || !Prompt) return new Response("not found", { status: 404}) 

        user.savedPosts = [...user.savedPosts, postId]
        post.usersSaved = [...post.usersSaved, userId]

        await user.save()
        await post.save()

        return new Response(JSON.stringify(user), {status: 200})

    } catch (error) {
        return new Response("failed to update user", {status: 500})
        
    }

}