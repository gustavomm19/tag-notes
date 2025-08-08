import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiKey = this.configService.get<string>('API_KEY');
    const requestKey = request.headers['x-api-key'];

    if (!requestKey || requestKey !== apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
