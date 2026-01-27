import api from "./axios";

export const sendOtpApi = (phone: string) =>
  api.post("/guides/send-otp", { phone });

export const verifyOtpApi = (phone: string, otp: string) =>
  api.post(`/guides/verify-otp?phone=${encodeURIComponent(phone)}&otp=${otp}`);
