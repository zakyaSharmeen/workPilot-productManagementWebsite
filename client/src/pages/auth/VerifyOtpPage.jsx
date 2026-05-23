// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { verifyOtp, resendOtp } from '../../redux/slices/authSlice';
// import Input  from '../../components/ui/Input';
// import Button from '../../components/ui/Button';

// export default function VerifyOtpPage() {
//   const dispatch   = useDispatch();
//   const navigate   = useNavigate();
//   const { loading, registerEmail } = useSelector((s) => s.auth);
//   const [otp, setOtp]     = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!otp) { setError('Please enter the OTP'); return; }
//     const res = await dispatch(verifyOtp({ email: registerEmail, otp }));
//     if (!res.error) navigate('/dashboard');
//   };

//   const handleResend = () => {
//     if (registerEmail) dispatch(resendOtp({ email: registerEmail }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
//         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//           <span className="text-3xl">✉️</span>
//         </div>
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify your email</h1>
//         <p className="text-sm text-gray-500 mb-8">
//           We sent a 6-digit OTP to <span className="font-medium text-gray-700">{registerEmail}</span>
//         </p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input label="OTP Code" type="text" placeholder="Enter 6-digit OTP"
//             value={otp} onChange={(e) => setOtp(e.target.value)} error={error}
//             maxLength={6} className="text-center text-lg tracking-widest" />
//           <Button type="submit" className="w-full" loading={loading}>Verify Email</Button>
//         </form>
//         <p className="text-sm text-gray-500 mt-6">
//           Didn't receive it?{' '}
//           <button onClick={handleResend} className="text-blue-600 hover:underline font-medium">Resend OTP</button>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "../../redux/slices/authSlice";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function VerifyOtpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, registerEmail } = useSelector((s) => s.auth);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    const res = await dispatch(verifyOtp({ email: registerEmail, otp }));
    if (!res.error) navigate("/app/dashboard");
  };

  const handleResend = () => {
    if (registerEmail) dispatch(resendOtp({ email: registerEmail }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✉️</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verify your email
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          We sent a 6-digit OTP to{" "}
          <span className="font-medium text-gray-700">{registerEmail}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="OTP Code"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={error}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
          <Button type="submit" className="w-full" loading={loading}>
            Verify Email
          </Button>
        </form>
        <p className="text-sm text-gray-500 mt-6">
          Didn't receive it?{" "}
          <button
            onClick={handleResend}
            className="text-blue-600 hover:underline font-medium">
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
