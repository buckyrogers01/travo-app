export interface SendOtpRequest {
  phone: string;
}

export interface VerifyOtpResponse {
  token: string;
}

export interface AuthState {
  phone: string | null;
  loading: boolean;
  token: string | null;
  error: string | null;
  otpSent: boolean;
}
