import { Form, Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/api/posts";
import PostsCounter from "./components/posts-counter";

export const meta: MetaFunction = () => {
  return [{ title: "Posts" }, { name: "description", content: "Posts page" }];
};

export async function loader() {
  const posts = await getPosts();
  return posts;
}

export default function PostsList() {
  const posts = useLoaderData<typeof loader>();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <Link to="add-post">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Post
          </button>
        </Link>
      </div>

      <PostsCounter />

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded flex justify-between">
            <Link to={`${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
            </Link>

            <Form
              action={`${post.id}`}
              method="post"
              onSubmit={(event) => {
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorBoundary() {
  return <h1>Oops something wrong happened</h1>;
}
