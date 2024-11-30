import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    register(body: any): Promise<import("../user/user.entity").User>;
    getMe(req: any): any;
}
