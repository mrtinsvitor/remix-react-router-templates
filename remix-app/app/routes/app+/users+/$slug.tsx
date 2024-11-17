import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { User } from "~/types/user";

export const loader = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/users/${params.slug}`);
  const user: User = await response.json();
  return user;
};

export const action = async ({ params }: ActionFunctionArgs) => {
  await fetch(`http://localhost:3000/users/${params.slug}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return redirect("/app/users");
};

export default function PostDetails() {
  const users = useLoaderData<typeof loader>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {/* Individual post content */}
      <h3 className="text-xl font-semibold">{users.name}</h3>
      <p className="mt-2">{users.email}</p>
    </div>
  );
}
