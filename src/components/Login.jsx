const Login = () => {
  return (
    <>
      <form action="">
        <div className="flex flex-col items-center justify-center bg-gray-300 p-2">
          <div className="bg-white p-3 rounded-xl">
            <h1 className="font-bold text-center">Create Account</h1>
            <div className="flex flex-col">
              <label htmlFor="Login">Email Address </label>
              <input
                type="text"
                placeholder="Sign Up"
                className="rounded bg-gray-200 p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Login">Password</label>
              <input
                type="password"
                className="rounded bg-gray-200 p-2"
                required
              />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="Login">Confirm Password</label>
              <input
                type="password"
                className="rounded bg-gray-200 p-2"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 text-white w-[13rem] rounded p-2">
                Sign Up
              </button>
            </div>
            <p className="text-center">Or</p>

            <a className="border p-2 flex items-center justify-center" href="#">
              Sign Up with Google
            </a>
            <p>By clicking sign up, you agree to our terms and conditions</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
