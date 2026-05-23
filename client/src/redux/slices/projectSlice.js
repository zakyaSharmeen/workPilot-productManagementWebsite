import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjectsAPI,
  createProjectAPI,
  getProjectAPI,
  updateProjectAPI,
  deleteProjectAPI,
} from "../../services/api";
import toast from "react-hot-toast";

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProjectsAPI();
      return res.data.projects;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch projects",
      );
    }
  },
);

export const fetchProject = createAsyncThunk(
  "projects/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProjectAPI(id);
      return res.data.project;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch project",
      );
    }
  },
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createProjectAPI(data);
      return res.data.project;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create project",
      );
    }
  },
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProjectAPI(id, data);
      return res.data.project;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update project",
      );
    }
  },
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProjectAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete project",
      );
    }
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState: { list: [], current: null, loading: false, error: null },
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        toast.success("Project created!");
      })
      .addCase(createProject.rejected, (_, action) =>
        toast.error(action.payload),
      )
      .addCase(updateProject.fulfilled, (state, action) => {
        toast.success("Project updated!");
        state.list = state.list.map((p) =>
          p._id === action.payload._id ? action.payload : p,
        );
        if (state.current?._id === action.payload._id)
          state.current = action.payload;
      })
      .addCase(updateProject.rejected, (_, action) =>
        toast.error(action.payload),
      )
      .addCase(deleteProject.fulfilled, (state, action) => {
        toast.success("Project deleted!");
        state.list = state.list.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProject.rejected, (_, action) =>
        toast.error(action.payload),
      );
  },
});

export const { clearCurrent } = projectSlice.actions;
export default projectSlice.reducer;
