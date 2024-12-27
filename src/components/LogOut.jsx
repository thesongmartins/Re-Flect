/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const Logout = ({ handleSignOut }) => {
  const navigate = useNavigate();
  const signOut = () => {
    // Here you would handle the logout logic
    // e.g., clearing the user's session, etc.
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gray-100 fixed w-screen top-0 left-0 z-50 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">
          Are you sure you want to log out?
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={signOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log Out
          </button>
          <button
            onClick={() => handleSignOut(false)}
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default Logout;
