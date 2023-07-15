import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'
import User from '@models/user'


export const GET = async (req) => {
  try {
    await connectToDB()

    
    
    

    // const {
    //   category, // Category corresponds to the 'tag' field in the posts
    //   text, // Full-text search parameter
    //   username, // Corresponds to a user's 'username'
    //   limit = 10, // Default limit to 10 documents
    // } = null

    const category = req.nextUrl.searchParams.get("category");
    const text = req.nextUrl.searchParams.get("text");
    const username = req.nextUrl.searchParams.get("username");
    const limit = req.nextUrl.searchParams.get("limit") || 10;
    


    let query = {}

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

    const prompts = await Prompt
      .find(query)
      .limit(Number(limit))
      .populate('creator')
    
    return new Response(JSON.stringify(prompts), { status: 200 })

  } catch (error){
    return new Response("failed to fetch prompts", { status: 500 })
  }
}
