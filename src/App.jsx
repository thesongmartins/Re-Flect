import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import VerifyEmail from "./pages/Auth/VerifyEmail";

import Loading from "./components/Loading";
import useLoadingStore from "./store/loadingstore";

function App() {
  const { loading } = useLoadingStore();

  return (
    <>
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}

export default App;
