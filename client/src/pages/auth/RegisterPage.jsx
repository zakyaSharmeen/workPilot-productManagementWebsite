// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { register, setRegisterEmail } from '../../redux/slices/authSlice';
// import Input  from '../../components/ui/Input';
// import Button from '../../components/ui/Button';

// export default function RegisterPage() {
//   const dispatch    = useDispatch();
//   const navigate    = useNavigate();
//   const { loading } = useSelector((s) => s.auth);
//   const [form, setForm]     = useState({ name: '', email: '', password: '' });
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.name)               e.name     = 'Name is required';
//     if (!form.email)              e.email    = 'Email is required';
//     if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     const res = await dispatch(register(form));
//     if (!res.error) {
//       dispatch(setRegisterEmail(form.email));
//       navigate('/verify-otp');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-600 mb-1">WorkPilot</h1>
//           <p className="text-gray-500 text-sm">Create your account</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input label="Full Name" type="text" placeholder="John Doe"
//             value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
//           <Input label="Email" type="email" placeholder="you@example.com"
//             value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
//           <Input label="Password" type="password" placeholder="Min. 6 characters"
//             value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} />
//           <Button type="submit" className="w-full" loading={loading}>Create Account</Button>
//         </form>
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const res = await dispatch(register(form));
    if (!res.error) navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-1">WorkPilot</h1>
          <p className="text-gray-500 text-sm">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />
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
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          <Button type="submit" className="w-full" loading={loading}>
            Create Account
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
