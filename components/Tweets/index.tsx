/* eslint-disable quotes */
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  useEffect,
  useMemo,
  experimental_useOptimistic as useOptimistic,
} from "react";
import { useRouter } from "next/navigation";
import updateTweet from "./updateTweet";
import Tweet from "./Tweet";
import { RealtimeChannel } from "@supabase/supabase-js";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, updateTweet);

  const supabase = useMemo(() => createClientComponentClient(), []);
  const router = useRouter();

  useEffect(() => {
    let channel: RealtimeChannel;
    try {
      channel = supabase
        .channel("realtime tweets")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tweets",
          },
          () => {
            router.refresh();
          }
        )
        .subscribe();
    } catch (error) {
      console.error("Error subscribing to channel:", error);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [supabase, router]);

  return optimisticTweets.map((tweet) => (
    <Tweet
      key={tweet.id}
      tweet={tweet}
      addOptimisticTweet={addOptimisticTweet}
    />
  ));
}
