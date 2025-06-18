import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: vi.fn().mockReturnValue('mock_jwt_token')
          }
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should successfully login with correct credentials', async () => {
    const jwtSpy = vi.spyOn(jwtService, 'sign');
    const result = await authService.login('testuser', 'correctpassword');
    
    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe('mock_jwt_token');
    expect(jwtSpy).toHaveBeenCalledWith({
      sub: 1,
      username: 'testuser'
    });
  });

  it('should throw UnauthorizedException for incorrect username', async () => {
    await expect(
      authService.login('wronguser', 'correctpassword')
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for incorrect password', async () => {
    await expect(
      authService.login('testuser', 'wrongpassword')
    ).rejects.toThrow(UnauthorizedException);
  });
});