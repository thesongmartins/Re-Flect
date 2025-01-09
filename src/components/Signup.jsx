import { useState } from "react";
import { Link } from "react-router-dom";
import useLoadingStore from "../store/loadingstore";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const { start, stop } = useLoadingStore();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErr("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErr("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErr("Password must match confirm password.");
      return;
    }
    start();
    // Here you would handle form submission,
    // e.g., sending data to an API, validating input, etc.
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    setTimeout(() => {
      navigate("/dashboard");
      stop();
    }, 2000);
  };
  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Create Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Sign Up"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handlePasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                onChange={handleConfirmPasswordChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg ```javascript bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </div>
            <p className="text-red-600 text-xs text-center font-semibold">
              {err}
            </p>

            <div className="relative mt-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <p className="text-center text-gray-600 text-xs mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
