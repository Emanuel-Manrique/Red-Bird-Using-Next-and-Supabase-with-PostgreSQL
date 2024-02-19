import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../components/Buttons/AuthButtonServer";
import { redirect } from "next/navigation";
import NewTweet from "../components/Tweets/NewTweet";
import Tweets from "@/components/Tweets";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  let session;
  try {
    const result = await supabase.auth.getSession();
    session = result.data?.session;
  } catch (error) {
    console.error("Error getting session:", error);
  }

  if (!session) {
    redirect("/login");
  }

  let data;
  try {
    // Use Supabase client to interact with the database
    const result = await supabase
      // Select the 'tweets' table
      .from("tweets")
      // Select all columns ('*'), and join with 'profiles' table on 'author' column and 'likes' table on 'user_id' column
      .select("*, author: profiles(*), likes(user_id)")
      // Order the results by 'created_at' column in descending order
      .order("created_at", { ascending: false });

    // Assign the data from the result to 'data' variable
    data = result.data;
  } catch (error) {
    // Log any error that occurs during the fetch operation, of course this shoud be another way to handle errors
    console.error("Error fetching tweets:", error);
  }

  // Transform the 'data' array using the map function.
  // If 'data' is null or undefined (checked using the optional chaining '?.'), return an empty array '[]' to avoid map errors.
  const tweets =
    data?.map((tweet) => ({
      // Spread the properties of the current 'tweet' object into the new object.
      ...tweet,

      // This is a typescript solution to type safely, but in production its not neccesary
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,

      // Check if the current user has liked the tweet.
      // The 'find' function returns the first 'like' object where 'like.user_id' matches 'session.user.id'.
      // If such a 'like' object is found, 'find' returns it (which is truthy), otherwise it returns 'undefined' (which is falsy).
      // The double NOT '!!' operator is used to convert this truthy or falsy value to a boolean.
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session.user.id
      ),

      // Get the number of likes for the tweet based on the amount of people that liked it.
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-between px-4 py-6 border border-gray-800 border-t-0">
        <h1 className="text-xl font-bold text-white">Home</h1>
        <AuthButtonServer />
      </div>
      <NewTweet user={session.user} />
      <Tweets tweets={tweets} />
    </div>
  );
}
