import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { type loader as rootLoader } from "~/root";

interface Comment {
  id: string;
  name: string;
  email: string;
  body: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${params.slug}`
  );
  const comments: Comment[] = await response.json();
  return comments;
};

export default function Comments() {
  const comments = useLoaderData<typeof loader>();
  const { user } = useRouteLoaderData<typeof rootLoader>("root");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <p>Hey {user.name} 👋</p>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{comment.name}</h3>
            <p>{comment.body}</p>
            <p className="mt-2 text-gray-600">By: {comment.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
