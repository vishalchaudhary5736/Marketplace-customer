export type Role = "CUSTOMER" | "VENDOR" | "ADMIN";
export type UserStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "INACTIVE";

export type User = {
  id: string;
  email: string;
  emailVerifiedAt: string | null;
  isEmailVerified: boolean;
  phone: string | null;
  mobileVerifiedAt: string | null;
  isMobileVerified: boolean | null;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  role: Role;
  dob?: string | null;
  gender?: string | null;
  status: UserStatus;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  countryCode: string;
  mobileNumber: string;
  agreeTerms: boolean;
  isProfileSkip: boolean;
  isSubAdmin: boolean | null;
  lastOrder: string | null;
  totalOrders: number | null;
  totalSpent: number | string;
  twoFactorEnabled: boolean | null;
  twoFactorSecret: boolean | null;
  twoFactorSetupCompleted: boolean | null;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  statusCode?: number;
  meta?: unknown | null;
  timestamp?: string;
  path?: string;
  requestId?: string;
};

export type LoginData = {
  userDetail: User;
  accessToken: string;
  refreshToken: string;
  nextStep: string;
};

export type LoginResponse = LoginData & {
  message: string;
};

export type ApiResponseV2<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type SignupResponse = {
  success: boolean;
  message: string;
  data: {
    email: string;
    nextStep: string;
    expiresInSeconds: number;
    resendAvailableInSeconds: number;
  };
};

export interface ApiFieldError {
  field: string;
  messages: string[];
}

export type VerifyEmailDetails = {
  nextStep: string;
  email: string;
};

export interface ApiErrorResponse<T = Record<string, unknown>> {
  success: false;
  statusCode: number;
  code: string;
  message: string;
  action?: string;
  errors?: ApiFieldError[] | null;
  details?: T | null;
  timestamp: string;
  path: string;
  requestId: string;
}

export type ApiFailedResponse<T = Record<string, unknown>> =
  ApiErrorResponse<T>;

export type ResendOtpPayload = {
  otpType: string;
  email: string;
};

export type ResendOtpResponse = {
  success: string;
  message: string;
  data: { email: string; nextStep: string };
};

export type VerifyOtpPayload = {
  otpType: string;
  email: string;
  otp: string;
};

export type VerifyOtpResponse = LoginResponse;

export type ForgotPasswordResponse = {
  email: string;
  nextStep: string;
  message: string;
  expiresInSeconds: number;
  resendAvailableInSeconds: number;
};

export type ResetPasswordResponse = {
  nextStep: string;
  message: string;
};

export type ResetPasswordPayload = {
  otp: string;
  email: string;
  newPassword: string;
};

export type LogoutResponse = {
  success: string;
  message: string;
};

export type LogoutPayload = {
  allDevices: boolean;
};
