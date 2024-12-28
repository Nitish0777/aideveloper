import React, { useContext } from "react";
import { UserContext } from "../context/user.context";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Home</h2>
        <p>Welcome, {`${user.email}`}</p>
        <p className="mt-4">
          {JSON.stringify(user, null, 2)}
        </p>
      </div>
    </div>
  );
};

export default Home;
