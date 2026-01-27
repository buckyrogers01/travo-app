import { sendOtpApi, verifyOtpApi } from "@/app/api/guideApi";
import { AuthState } from "@/app/dtos/auth";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendOtp = createAsyncThunk<
  string,          // return type
  string,          // argument (phone)
  { rejectValue: string }
>(
  "auth/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      await sendOtpApi(phone);
      return phone;
    } catch {
      return rejectWithValue("Failed to send OTP");
    }
  }
);

export const verifyOtp = createAsyncThunk<
  string, // token
  { phone: string; otp: string },
  { rejectValue: string }
>(
  "auth/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const res = await verifyOtpApi(phone, otp);
      await AsyncStorage.setItem('userId', res.data.id.toString());
      return res.data;
    } catch {
      return rejectWithValue("Invalid or expired OTP");
    }
  }
);

/* =======================
   STATE
======================= */

const initialState: AuthState = {
  phone: null,
  token: null,
  loading: false,
  error: null,
  otpSent: false,
};

/* =======================
   SLICE
======================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.phone = null;
      state.otpSent = false;
      SecureStore.deleteItemAsync("token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---- SEND OTP ---- */
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.phone = action.payload;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "OTP send failed";
      })

      /* ---- VERIFY OTP (LOGIN) ---- */
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Invalid OTP";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
