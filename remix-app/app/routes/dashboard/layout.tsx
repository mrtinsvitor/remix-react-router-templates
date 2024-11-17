import { Link, NavLink, Outlet } from "@remix-run/react";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <Link to="." className="text-xl font-bold py-4">
          Dashboard
        </Link>
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
          {/* Add more navigation items here */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
