import { json, useLoaderData, Link } from "@remix-run/react";

export const loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  console.log(users);
  return json(users);
};

export default function UsersList() {
  const users: any = useLoaderData();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="border p-4 rounded">
            <Link to={`${user.id}`}>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p>{user.email}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
