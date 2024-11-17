import type { MetaFunction } from "@remix-run/node";
import { Form, redirect, useRouteError } from "@remix-run/react";
import { getUserId, setUserId } from "~/utils/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const user = getUserId();
  if (user) {
    throw redirect("/app");
  }

  return null;
}

export async function action() {
  const user = setUserId(1);
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return redirect("/app");
}

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <Form method="post">
            <button type="submit">Login</button>
          </Form>
        </nav>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  return <div>Error: {error?.data || "Unknown error"}</div>;
}
