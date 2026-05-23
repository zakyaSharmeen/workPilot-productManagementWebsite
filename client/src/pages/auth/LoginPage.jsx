// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../redux/slices/authSlice';
// import Input  from '../../components/ui/Input';
// import Button from '../../components/ui/Button';

// export default function LoginPage() {
//   const dispatch    = useDispatch();
//   const navigate    = useNavigate();
//   const { loading } = useSelector((s) => s.auth);
//   const [form, setForm]     = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.email)    e.email    = 'Email is required';
//     if (!form.password) e.password = 'Password is required';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     const res = await dispatch(login(form));
//     if (!res.error) navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-600 mb-1">WorkPilot</h1>
//           <p className="text-gray-500 text-sm">Sign in to your account</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input label="Email" type="email" placeholder="you@example.com"
//             value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
//           <Input label="Password" type="password" placeholder="••••••••"
//             value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} />
//           <Button type="submit" className="w-full" loading={loading}>Sign In</Button>
//         </form>
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const res = await dispatch(login(form));
    if (!res.error) navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-1">WorkPilot</h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          <Button type="submit" className="w-full" loading={loading}>
            Sign In
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
