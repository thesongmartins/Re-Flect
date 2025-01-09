import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Home/Dashboard";
import VerifyEmail from "./components/VerifyEmail";
import Settings from "./components/Setting";
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
        <Route path="/setting" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
