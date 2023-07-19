//patch

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const PATCH = async (request, { params }) => {
    const { userId, postId } = await request.json()

    try {
        await connectToDB()

        
        const post = await Prompt.findById(postId)
        


        if(!userId || !post) return new Response("not found", { status: 404}) 

        
        post.usersSaved = [...post.usersSaved, userId]

        
        await post.save()

        return new Response(JSON.stringify(post), {status: 200})

    } catch (error) {
        return new Response("failed to update user", {status: 500})
        
    }

}