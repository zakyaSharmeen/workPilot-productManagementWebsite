// import axios from "axios";

// const api = axios.create({
//   // baseURL: "http://localhost:5000",
//   baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000",

//   headers: { "Content-Type": "application/json" },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // ── Auth
// export const registerAPI = (data) => api.post("/api/auth/register", data);
// export const loginAPI = (data) => api.post("/api/auth/login", data);
// export const verifyOtpAPI = (data) => api.post("/api/auth/verify-otp", data);
// export const resendOtpAPI = (data) => api.post("/api/auth/resend-otp", data);

// // ── User
// export const getProfileAPI = () => api.get("/api/users/me");
// export const updateProfileAPI = (data) => api.put("/api/users/me", data);
// export const uploadAvatarAPI = (form) =>
//   api.put("/api/users/me/avatar", form, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// export const getAssignedTasksAPI = () => api.get("/api/users/me/tasks");

// // ── Projects
// export const getProjectsAPI = () => api.get("/api/projects");
// export const createProjectAPI = (data) => api.post("/api/projects", data);
// export const getProjectAPI = (id) => api.get(`/api/projects/${id}`);
// export const updateProjectAPI = (id, data) =>
//   api.put(`/api/projects/${id}`, data);
// export const deleteProjectAPI = (id) => api.delete(`/api/projects/${id}`);

// // ── Tasks
// export const getTasksAPI = (params) => api.get("/api/tasks", { params });
// export const createTaskAPI = (data) => api.post("/api/tasks", data);
// export const getTaskAPI = (id) => api.get(`/api/tasks/${id}`);
// export const updateTaskAPI = (id, data) => api.put(`/api/tasks/${id}`, data);
// export const deleteTaskAPI = (id) => api.delete(`/api/tasks/${id}`);
// export const changeStatusAPI = (id, status) =>
//   api.patch(`/api/tasks/${id}/status`, { status });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth
export const registerAPI = (data) => api.post("/api/auth/register", data);
export const loginAPI = (data) => api.post("/api/auth/login", data);

// ── User
export const getProfileAPI = () => api.get("/api/users/me");
export const updateProfileAPI = (data) => api.put("/api/users/me", data);
export const uploadAvatarAPI = (form) =>
  api.put("/api/users/me/avatar", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getAssignedTasksAPI = () => api.get("/api/users/me/tasks");

// ── Projects
export const getProjectsAPI = () => api.get("/api/projects");
export const createProjectAPI = (data) => api.post("/api/projects", data);
export const getProjectAPI = (id) => api.get(`/api/projects/${id}`);
export const updateProjectAPI = (id, data) =>
  api.put(`/api/projects/${id}`, data);
export const deleteProjectAPI = (id) => api.delete(`/api/projects/${id}`);

// ── Tasks
export const getTasksAPI = (params) => api.get("/api/tasks", { params });
export const createTaskAPI = (data) => api.post("/api/tasks", data);
export const getTaskAPI = (id) => api.get(`/api/tasks/${id}`);
export const updateTaskAPI = (id, data) => api.put(`/api/tasks/${id}`, data);
export const deleteTaskAPI = (id) => api.delete(`/api/tasks/${id}`);
export const changeStatusAPI = (id, status) =>
  api.patch(`/api/tasks/${id}/status`, { status });

export default api;
