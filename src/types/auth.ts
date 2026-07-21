// TypeScript definitions matching Backend Java DTOs

export interface ResponseDto<T = any> {
  message: string;
  code: number;
  data?: T;
}

export interface LogoutResponseDto {
  message: string;
  status: number;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface CreateUserRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  dob: string;
  sex: string;
  role: string;
}

export interface ApiResponseDto {
  code: number;
  message: string;
}

export interface ResetPasswordRequestDto {
  email: string;
  token?: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserSession {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  agentId: string;
  githubAccount?: string;
  token?: string;
}
