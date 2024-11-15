import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto): Promise<{
        id: number;
        title: string;
        content: string | null;
        published: boolean | null;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        content: string | null;
        published: boolean | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        title: string;
        content: string | null;
        published: boolean | null;
    }>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<{
        id: number;
        title: string;
        content: string | null;
        published: boolean | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        content: string | null;
        published: boolean | null;
    }>;
}
