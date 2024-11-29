import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract token from Authorization header
    const authHeader = request.headers['authorization'];
    let token: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // Fallback: Extract token from cookies
    if (!token) {
      token = request.cookies?.['access_token'];
    }

    console.log('Extracted token:', token);

    if (!token) {
      throw new UnauthorizedException('Token not found in cookies or Authorization header.');
    }

    return super.canActivate(context);
  }
}
