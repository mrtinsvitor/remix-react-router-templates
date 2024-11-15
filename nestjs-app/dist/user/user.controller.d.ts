import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        email: string;
        name: string | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        name: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        email: string;
        name: string | null;
    }>;
}
