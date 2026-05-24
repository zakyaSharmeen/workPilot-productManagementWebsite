// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginAPI, registerAPI, verifyOtpAPI, resendOtpAPI, getProfileAPI, updateProfileAPI, uploadAvatarAPI } from '../../services/api';
// import toast from 'react-hot-toast';

// export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
//   try { const res = await loginAPI(data); localStorage.setItem('token', res.data.token); return res.data; }
//   catch (err) { return rejectWithValue(err.response?.data?.message || 'Login failed'); }
// });

// export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
//   try { const res = await registerAPI(data); return res.data; }
//   catch (err) { return rejectWithValue(err.response?.data?.message || 'Registration failed'); }
// });

// export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (data, { rejectWithValue }) => {
//   try { const res = await verifyOtpAPI(data); localStorage.setItem('token', res.data.token); return res.data; }
//   catch (err) { return rejectWithValue(err.response?.data?.message || 'OTP verification failed'); }
// });

// export const resendOtp = createAsyncThunk('auth/resendOtp', async (data, { rejectWithValue }) => {
//   try { const res = await resendOtpAPI(data); return res.data; }
//   catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to resend OTP'); }
// });

// export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
//   try { const res = await getProfileAPI(); return res.data.user; }
//   catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile'); }
// });

// export const updateProfile = createAsyncThunk('auth/updateProfile', async (data, { rejectWithValue }) => {
//   try { const res = await updateProfileAPI(data); return res.data.user; }
//   catch (err) { return rejectWithValue(err.response?.data?.message || 'Update failed'); }
// });

// export const uploadAvatar = createAsyncThunk('auth/uploadAvatar', async (formData, { rejectWithValue }) => {
//   try { const res = await uploadAvatarAPI(formData); return res.data.user; }
//   catch (err) { return rejectWithValue(err.response?.data?.message || 'Avatar upload failed'); }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: { user: null, token: localStorage.getItem('token') || null, loading: false, error: null, registerEmail: null },
//   reducers: {
//     logout(state) { state.user = null; state.token = null; localStorage.removeItem('token'); },
//     clearError(state) { state.error = null; },
//     setRegisterEmail(state, action) { state.registerEmail = action.payload; },
//   },
//   extraReducers: (builder) => {
//     const pending  = (state)         => { state.loading = true;  state.error = null; };
//     const rejected = (state, action) => { state.loading = false; state.error = action.payload; toast.error(action.payload); };
//     builder
//       .addCase(login.pending, pending)
//       .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token; toast.success('Welcome back!'); })
//       .addCase(login.rejected, rejected)
//       .addCase(register.pending, pending)
//       .addCase(register.fulfilled, (state) => { state.loading = false; toast.success('OTP sent to your email!'); })
//       .addCase(register.rejected, rejected)
//       .addCase(verifyOtp.pending, pending)
//       .addCase(verifyOtp.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token; toast.success('Email verified!'); })
//       .addCase(verifyOtp.rejected, rejected)
//       .addCase(resendOtp.pending, pending)
//       .addCase(resendOtp.fulfilled, (state) => { state.loading = false; toast.success('OTP resent!'); })
//       .addCase(resendOtp.rejected, rejected)
//       .addCase(fetchProfile.fulfilled, (state, action) => { state.user = action.payload; })
//       .addCase(updateProfile.pending, pending)
//       .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; toast.success('Profile updated!'); })
//       .addCase(updateProfile.rejected, rejected)
//       .addCase(uploadAvatar.pending, pending)
//       .addCase(uploadAvatar.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; toast.success('Avatar updated!'); })
//       .addCase(uploadAvatar.rejected, rejected);
//   },
// });

// export const { logout, clearError, setRegisterEmail } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  getProfileAPI,
  updateProfileAPI,
  uploadAvatarAPI,
} from "../../services/api";
import toast from "react-hot-toast";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginAPI(data);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfileAPI();
      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateProfileAPI(data);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await uploadAvatarAPI(formData);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Avatar upload failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    };
    builder
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        toast.success("Welcome back!");
      })
      .addCase(login.rejected, rejected)
      .addCase(register.pending, pending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        toast.success("Account created!");
      })
      .addCase(register.rejected, rejected)
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, pending)
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Profile updated!");
      })
      .addCase(updateProfile.rejected, rejected)
      .addCase(uploadAvatar.pending, pending)
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Avatar updated!");
      })
      .addCase(uploadAvatar.rejected, rejected);
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
