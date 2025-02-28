"use client";
import { useState } from "react";
import { auth } from "@/firebase";  // ✅ Ensure Firebase is imported correctly
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE_URL from "@/config";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Authenticate user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // ✅ Get JWT Token from backend
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
