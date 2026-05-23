import { Router } from 'express';
import { register, verifyOTP, resendOTP, login } from '../controllers/authController.js';
import { registerValidator, loginValidator, emailValidator, otpValidator } from '../validators/authValidator.js';

const router = Router();

router.post('/register',   registerValidator, register);
router.post('/verify-otp', otpValidator,      verifyOTP);
router.post('/resend-otp', emailValidator,    resendOTP);
router.post('/login',      loginValidator,    login);

export default router;
