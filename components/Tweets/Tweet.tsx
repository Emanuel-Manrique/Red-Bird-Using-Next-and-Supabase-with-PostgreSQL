import Image from "next/image";
import Likes from "./Likes";

export default function Tweet({ tweet, addOptimisticTweet }: { tweet: TweetWithAuthor, addOptimisticTweet: (tweet: TweetWithAuthor) => void;}) {
    return (
      <div
        key={tweet.id}
        className="border border-gray-800 border-t-0 px-4 py-8 flex"
      >
        <div className="h-12 w-12">
          <Image
            className="rounded-full"
            src={tweet.author.avatar_url.replace(/"/g, "")}
            alt="tweet user avatar"
            width={48}
            height={48}
          />
        </div>
        <div className="ml-4">
          <p>
            <span className="font-bold text-white">
              {tweet.author.name.replace(/"/g, "")}
            </span>
          </p>
          <p className="text-white">{tweet.title}</p>
          <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
        </div>
      </div>
    );
  }