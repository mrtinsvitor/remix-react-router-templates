import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  redirect,
  useRouteLoaderData,
} from "@remix-run/react";
import type { loader as rootLoader } from "~/root";
import { getUserId, setUserId } from "~/utils/auth";

export async function action({ request }: ActionFunctionArgs) {
  setUserId(null);
  return redirect("/");
}

export async function loader({ request }: LoaderFunctionArgs) {
  // This should be extracted to a function for auth
  const userId = getUserId();
  if (!userId) {
    throw redirect("/");
  }

  return { userId };
}

export default function DashboardLayout() {
  const { user } = useRouteLoaderData<typeof rootLoader>("root");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <div>
          <Link to="." className="text-xl font-bold py-4">
            Dashboard
          </Link>

          <p>Hey {user?.name}! 👋</p>
        </div>
        <nav className="mt-4 space-y-2">
          <NavLink
            to="posts"
            className={({ isActive }) =>
              `block p-2 hover:bg-blue-400 rounded hover:text-white ${
                isActive ? "bg-blue-400 text-white" : ""
              }`
            }
          >
            Posts
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              to="users"
              className={({ isActive }) =>
                `block p-2 hover:bg-blue-200 rounded hover:text-white ${
                  isActive ? "bg-blue-400 text-white" : ""
                }`
              }
            >
              Users
            </NavLink>
          )}
          {/* Add more navigation items here */}
        </nav>

        <Form method="post" className="mt-4">
          <button type="submit" className="bg-red-500 text-white p-2">
            Logout
          </button>
        </Form>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
