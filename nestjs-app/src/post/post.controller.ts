import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    console.log('createPostDto', createPostDto);
    return this.postService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findPosts({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findPostById({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost({
      where: { id: +id },
      data: updatePostDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.deletePost({ id: +id });
  }
}
