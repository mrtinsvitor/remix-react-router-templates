import { Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${params.slug}`
  );
  const comments = await response.json();
  return Response.json(comments);
};

export default function Comments() {
  const comments: any = useLoaderData();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

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
