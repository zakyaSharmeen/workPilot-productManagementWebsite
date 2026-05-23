const otpEmailTemplate = (name, otp, expiresMinutes = 10) => `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<style>
  body{margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif}
  .wrap{max-width:520px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.08)}
  .hdr{background:#4f46e5;padding:36px 32px;text-align:center}
  .hdr h1{color:#fff;margin:0;font-size:22px}
  .bdy{padding:36px 32px;color:#333;line-height:1.6}
  .otp-box{background:#f0f0ff;border:2px dashed #4f46e5;border-radius:10px;text-align:center;padding:28px 20px;margin:28px 0}
  .otp{font-size:40px;font-weight:700;letter-spacing:12px;color:#4f46e5}
  .ftr{background:#f0f2f5;padding:18px 32px;text-align:center;font-size:12px;color:#aaa}
</style></head>
<body>
  <div class="wrap">
    <div class="hdr"><h1>Email Verification</h1></div>
    <div class="bdy">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Enter the OTP below to activate your account.</p>
      <div class="otp-box"><div class="otp">${otp}</div></div>
      <p>Valid for <strong>${expiresMinutes} minutes</strong>. Never share it with anyone.</p>
    </div>
    <div class="ftr">© ${new Date().getFullYear()} Project Manager</div>
  </div>
</body></html>`;

export default otpEmailTemplate;
