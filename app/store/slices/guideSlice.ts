import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitGuideProfileApi, uploadGuideDocumentsApi } from "@/app/api/guideApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const uploadGuideDocuments = createAsyncThunk(
  "guide/uploadDocuments",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      await uploadGuideDocumentsApi(formData);
      return true;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data || "Document upload failed"
      );
    }
  }
);


export const submitGuideProfile = createAsyncThunk(
  "guide/submitProfile",
  async (
    { guideId, data }: { guideId: number; data: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await submitGuideProfileApi(guideId, data);
      AsyncStorage.setItem("guideId", res.data.id.toString());
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
  documentsUploaded: boolean;   // ✅ ADD THIS
}

const initialState: GuideState = {
  loading: false,
  error: null,
  profileCompleted: false,
  documentsUploaded: false,     // ✅
};

const guideSlice = createSlice({
  name: "guide",
  initialState,
  reducers: {
    resetGuideState(state) {
      state.loading = false;
      state.error = null;
      state.profileCompleted = false;
      state.documentsUploaded = false;
    },
  },
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
      })
      .addCase(uploadGuideDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadGuideDocuments.fulfilled, (state) => {
        state.loading = false;
        state.documentsUploaded = true;
      })
      .addCase(uploadGuideDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { resetGuideState } = guideSlice.actions;
export default guideSlice.reducer;