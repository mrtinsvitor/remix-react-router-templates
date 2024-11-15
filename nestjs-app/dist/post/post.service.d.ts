import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    findPostById(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null>;
    findPosts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<Post[]>;
    createPost(data: Prisma.PostCreateInput): Promise<Post>;
    updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post>;
    deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post>;
}
