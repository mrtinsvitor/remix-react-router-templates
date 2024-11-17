import { User } from "~/types/user";

export async function getUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3000/users");
  const users: User[] = await response.json();
  return users;
}
