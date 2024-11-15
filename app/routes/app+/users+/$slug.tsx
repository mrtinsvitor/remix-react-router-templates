import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.slug}`
  );
  const user = await response.json();
  return Response.json(user);
};

export const action = async ({ params }: ActionFunctionArgs) => {
  await fetch(`http://localhost:3000/users/${params.slug}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return redirect("/app/users");
};

export default function PostDetails() {
  const users: any = useLoaderData();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {/* Individual post content */}
      <h3 className="text-xl font-semibold">{users.name}</h3>
      <p className="mt-2">{users.email}</p>
      <p className="mt-2">{users.phone}</p>
      <p className="mt-2">{users.website}</p>
    </div>
  );
}
