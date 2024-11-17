import { Post } from "~/types/post";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch("http://localhost:3000/posts");
  const posts: Post[] = await response.json();
  return posts;
}

export async function getPostById(id: string): Promise<Post> {
  try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
    const post: Post = await response.json();

    if (!post) {
      throw new Response("Post not found", { status: 404 });
    }
    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
