import { JwtService } from '@nestjs/jwt';

// Global mock for JwtService
vi.mock('@nestjs/jwt', () => ({
  JwtService: vi.fn(() => ({
    sign: vi.fn().mockReturnValue('mock_jwt_token')
  }))
}));