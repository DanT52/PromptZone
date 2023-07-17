//patch

import { connectToDB } from "@utils/database";
import User from '@models/user'
import Prompt from "@models/prompt";


export const PATCH = async (request, { params }) => {
    const { userId, postId } = await request.json()

    console.log(userId)
    console.log(postId)

    try {
        await connectToDB()

        const user = await User.findById(userId)
        const post = await Prompt.findById(postId)
        


        if(!user || !post) return new Response("not found", { status: 404}) 

        user.savedPosts = user.savedPosts.filter((savedPostId) => savedPostId !== postId);
        post.usersSaved = post.usersSaved.filter((savedUserId) => savedUserId !== userId);

        console.log("hi boss")


        await user.save()
        await post.save()

        return new Response(JSON.stringify(user), {status: 200})

    } catch (error) {
        return new Response("failed to update user", {status: 500})
        
    }

}