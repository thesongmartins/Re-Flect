/* eslint-disable react/prop-types */
const Logout = ({ handleSignOut, setIsLoggedOut }) => {
  return (
    <div className="min-h-screen bg-gray-100 fixed w-screen top-0 left-0 z-50 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl text-black font-bold mb-4">
          Are you sure you want to log out?
        </h2>
        <div className="flex w-full justify-center items-center gap-4">
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log Out
          </button>
          <button
            onClick={() => setIsLoggedOut(false)}
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
