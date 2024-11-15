import { json, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.slug}`
  );
  const user = await response.json();
  console.log(user);
  return json(user);
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
