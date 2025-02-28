"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else {
      try {
        const decoded = jwtDecode(token); // ✅ Correct function name
        setUser({ email: decoded.email });
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/login");
      }
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Email: {user.email}</p> {/* ✅ Correctly shows logged-in user */}
      <button onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
