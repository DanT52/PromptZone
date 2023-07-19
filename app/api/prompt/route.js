import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'
import User from '@models/user'


export const GET = async (req) => {
  try {
    await connectToDB()

    
    
    

  

    const category = req.nextUrl.searchParams.get("category");
    const text = req.nextUrl.searchParams.get("text");
    const username = req.nextUrl.searchParams.get("username");
    const limit = req.nextUrl.searchParams.get("limit") || 10;
    const mostSaved = req.nextUrl.searchParams.get("mostSaved") || "false";
    


    let query = {}
    let prompts = []

    // If category is provided, filter by tag
    if (category) query.tag = category
    
    // If username is provided, find user ID and add to query
    if (username) {
      const user = await User.findOne({ username })
      if (user) query.creator = user._id
    }

    // If text is provided, perform a full-text search
    if (text) {
      query.$or = [
        { prompt: new RegExp(text, 'i') },
        { description: new RegExp(text, 'i') },
        { author: new RegExp(text, 'i') },
      ]
    }

    if (mostSaved ==="true" ) {
      prompts = await Prompt
      .find(query)
      .populate('creator')

      prompts.sort((a, b) => b.usersSaved.length - a.usersSaved.length)

      prompts = prompts.slice(0, limit)

      

    } else {
      prompts = await Prompt
      .find(query)
      .limit(Number(limit))
      .populate('creator')

    }

    
    
    return new Response(JSON.stringify(prompts), { status: 200 })

  } catch (error){
    return new Response("failed to fetch prompts", { status: 500 })
  }
}