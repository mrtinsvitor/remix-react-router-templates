import { Form, Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return Response.json(users);
};

export default function UsersList() {
  const users: any = useLoaderData<typeof loader>();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <Link to="add-user">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add User
          </button>
        </Link>
      </div>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="border p-4 rounded flex justify-between">
            <Link to={`${user.id}`}>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p>{user.email}</p>
            </Link>

            <Form
              action={`${user.id}`}
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
