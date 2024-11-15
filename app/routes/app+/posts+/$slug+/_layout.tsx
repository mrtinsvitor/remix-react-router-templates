import { json, Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  const { slug } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${slug}`
  );
  const post = await response.json();
  return json(post);
};

export default function PostDetails() {
  const post: any = useLoaderData();
  const isCommentsActive = window.location.pathname.includes("comments");
  const commentsLinkText = isCommentsActive ? "Hide Comments" : "View Comments";
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Post Details</h2>
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="mt-2">{post.body}</p>
      <Link
        to={isCommentsActive ? `.` : `comments`}
        className="text-blue-500 underline mt-4"
      >
        {commentsLinkText}
      </Link>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
