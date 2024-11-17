import { useLoaderData } from "@remix-run/react";
import type { loader as postsLoader } from "..";

export default function PostsCounter() {
  const posts = useLoaderData<typeof postsLoader>();

  return (
    <div className="text-sm mb-4">
      <p>There are {posts.length} posts:</p>
    </div>
  );
}
