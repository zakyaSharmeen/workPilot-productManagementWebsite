import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI, changeStatusAPI } from '../../services/api';
import toast from 'react-hot-toast';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (params, { rejectWithValue }) => {
  try { const res = await getTasksAPI(params); return { tasks: res.data.tasks, total: res.data.total, page: res.data.page }; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch tasks'); }
});

export const createTask = createAsyncThunk('tasks/create', async (data, { rejectWithValue }) => {
  try { const res = await createTaskAPI(data); return res.data.task; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to create task'); }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }, { rejectWithValue }) => {
  try { const res = await updateTaskAPI(id, data); return res.data.task; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to update task'); }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, { rejectWithValue }) => {
  try { await deleteTaskAPI(id); return id; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to delete task'); }
});

export const changeTaskStatus = createAsyncThunk('tasks/changeStatus', async ({ id, status }, { rejectWithValue }) => {
  try { const res = await changeStatusAPI(id, status); return res.data.task; }
  catch (err) { return rejectWithValue(err.response?.data?.message || 'Failed to update status'); }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { list: [], total: 0, page: 1, loading: false, error: null },
  reducers: { clearTasks(state) { state.list = []; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending,   (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.loading = false; state.list = action.payload.tasks; state.total = action.payload.total; state.page = action.payload.page; })
      .addCase(fetchTasks.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createTask.fulfilled, (state, action) => { state.list.unshift(action.payload); toast.success('Task created!'); })
      .addCase(createTask.rejected,  (_, action) => toast.error(action.payload))
      .addCase(updateTask.fulfilled, (state, action) => { toast.success('Task updated!'); state.list = state.list.map((t) => t._id === action.payload._id ? action.payload : t); })
      .addCase(updateTask.rejected,  (_, action) => toast.error(action.payload))
      .addCase(deleteTask.fulfilled, (state, action) => { toast.success('Task deleted!'); state.list = state.list.filter((t) => t._id !== action.payload); })
      .addCase(deleteTask.rejected,  (_, action) => toast.error(action.payload))
      .addCase(changeTaskStatus.fulfilled, (state, action) => { state.list = state.list.map((t) => t._id === action.payload._id ? action.payload : t); })
      .addCase(changeTaskStatus.rejected,  (_, action) => toast.error(action.payload));
  },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
