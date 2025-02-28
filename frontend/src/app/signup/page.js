"use client";
import { useState } from "react";
import { auth } from "@/firebase";  // ✅ Updated path
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import API_BASE_URL from "@/config";  // ✅ Import the API URL

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", plan: "Free" });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        name: form.name,
        email: form.email,
        password: form.password,
        plan: form.plan,
      });
  
      toast.success("Signup successful! Please log in.");
      router.push("/login");
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.error : "Signup failed");
    }
  };
  
  
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Business Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="plan" onChange={handleChange}>
          <option value="Free">Free</option>
          <option value="Pro">Pro</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
