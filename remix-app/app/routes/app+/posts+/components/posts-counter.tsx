import { useLoaderData } from "@remix-run/react";
import { loader } from "../$slug+/_layout";

export default function PostsCounter() {
  const posts: any = useLoaderData<typeof loader>();

  return (
    <div className="text-sm mb-4">
      <p>There are {posts.length} posts:</p>
    </div>
  );
}
