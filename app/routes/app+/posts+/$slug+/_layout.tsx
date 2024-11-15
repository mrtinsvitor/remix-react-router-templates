import { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
} from "@remix-run/react";

export const loader = async ({ params }) => {
  const { slug } = params;
  const response = await fetch(`http://localhost:3000/posts/${slug}`);
  const post = await response.json();
  return Response.json(post);
};

export const action = async ({ params }: ActionFunctionArgs) => {
  await fetch(`http://localhost:3000/posts/${params.slug}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return redirect("/app/posts");
};

export default function PostDetails() {
  const post: any = useLoaderData();
  const location = useLocation();

  const isCommentsActive = location.pathname.includes("comments");
  const commentsLinkText = isCommentsActive ? "Hide Comments" : "View Comments";

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Post Details</h2>
        <Form
          method="post"
          onSubmit={(event) => {
            // Confirmation modal demo:
            // const response = confirm(
            //   "Please confirm you want to delete this record."
            // );
            // if (!response) {
            //   event.preventDefault();
            // }
          }}
        >
          <button
            type="submit"
            className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </Form>
      </div>
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="mt-2">{post.content}</p>
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
