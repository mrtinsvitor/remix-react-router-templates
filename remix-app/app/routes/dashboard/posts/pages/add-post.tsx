import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const newPost = Object.fromEntries(formData);

  await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  return redirect("/app/posts");
};

export default function AddPost() {
  const actionData: any = useActionData<typeof action>();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
      </Form>
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
    </div>
  );
}
