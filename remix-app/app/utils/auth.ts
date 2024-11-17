import { redirect } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import { User } from "~/types/user";

let userId: number | null = null;

export function setUserId(id: number | null) {
  userId = id;
  return userId;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data as Record<string, unknown> | undefined;
}

/**
 * Get the user ID from the request
 */
export function getUserId() {
  // TODO: Add authentication logic here (sessions/cookies/etc)
  return userId;
}

export function getUserData(): User {
  const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    role: "admin",
  };
  return user;
}

/**
 * Require a user to be logged in to access a route
 */
export function requireUserId() {
  const userId = getUserId();
  if (!userId) {
    throw redirect("/");
  }
  return userId;
}

/**
 * Get the user data from the root loader
 */
export function useUser(): User {
  const data = useMatchesData("root");
  const user = data?.user;
  return user as User;
}

/**
 * Require a user to be an admin to access a route
 */
export function requireAdminUser(user: User) {
  if (user?.role !== "admin") {
    throw redirect("/app");
  }
}
