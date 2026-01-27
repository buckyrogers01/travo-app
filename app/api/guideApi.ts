import api from "./axios";

export interface GuideProfilePayload {
  name: string;
  email: string;
  bio: string;
  selectedLanguages: string[];
  experienceYears: string; // or number
  baseLocation: string;
  expertise: string[];
}

export const sendOtpApi = (phone: string) =>
  api.post("/guides/send-otp", { phone });

export const verifyOtpApi = (phone: string, otp: string) =>
  api.post(`/guides/verify-otp?phone=${encodeURIComponent(phone)}&otp=${otp}`);

export const submitGuideProfileApi = (
  userId: number,
  payload: GuideProfilePayload
) => {
  return api.post(`/guides/${userId}`, payload);
};
