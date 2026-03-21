import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import api from "./api/axios";
import { setUser, clearUser } from "./store/authSlice";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Dashboard /> : <Navigate to="/" />;
};

const App = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log("User Data: ", user);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await api.get("/api/auth/user");

        dispatch(setUser(res.data.user));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <Toaster />

      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute />} />
      </Routes>
    </>
  );
};

export default App;
