import { json, Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return json(posts);
};

export default function Posts() {
  const posts: any = useLoaderData();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link to={`${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
