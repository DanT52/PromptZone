import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

export const POST = async (req, res) => {
    const { userId, prompt, tag, description, showEmail, date, author } = await req.json();

    const usersSaved = []

    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            description,
            showEmail,
            date,
            author,
            usersSaved

        })
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})

    }catch(error){
        return new Response("Failed to create a new prompt", { status: 500})

    }
}