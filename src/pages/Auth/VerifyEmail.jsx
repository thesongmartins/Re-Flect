import { useState } from "react";

const EmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email] = useState("mart***mail.com");

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleResend = () => {
    // Resend OTP logic here
    setOtp(["", "", "", "", "", ""]);
  };

  const handleContinue = () => {
    // Handle verification logic here
    console.log("Verifying OTP:", otp.join(""));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-10 rounded">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Verify your email
        </h1>

        <p className="text-center text-gray-600 text-sm">
          A message was sent to your email
          <br />
          <span className="font-medium">{email}</span> containing an OTP.
          <br />
          Please input the code to proceed
        </p>

        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>

        <div className="text-center text-sm text-gray-500">
          Didn&apos;t receive code?{" "}
          <button
            onClick={handleResend}
            className="text-blue-500 hover:text-blue-600"
          >
            Resend
          </button>
        </div>

        <div className="text-xs text-center text-gray-400">
          Never disclose your OTP to anyone
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
