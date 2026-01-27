import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitGuideProfileApi } from "@/app/api/guideApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const submitGuideProfile = createAsyncThunk(
  "guide/submitProfile",
  async (
    { guideId, data }: { guideId: number; data: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await submitGuideProfileApi(guideId, data);
      AsyncStorage.setItem("guideId", res.data.id)
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Profile submission failed"
      );
    }
  }
);

interface GuideState {
  loading: boolean;
  error: string | null;
  profileCompleted: boolean;
}

const initialState: GuideState = {
  loading: false,
  error: null,
  profileCompleted: false,
};

const guideSlice = createSlice({
  name: "guide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitGuideProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitGuideProfile.fulfilled, (state) => {
        state.loading = false;
        state.profileCompleted = true;
      })
      .addCase(submitGuideProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default guideSlice.reducer;
