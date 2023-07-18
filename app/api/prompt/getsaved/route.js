import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (req) => {
  try {
    await connectToDB();

    const userId = req.nextUrl.searchParams.get("userId");
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;

    const query = { usersSaved: { $in: [userId] } };

    const prompts = await Prompt.find(query)
      .limit(limit)
      .populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch prompts", { status: 500 });
  }
};
