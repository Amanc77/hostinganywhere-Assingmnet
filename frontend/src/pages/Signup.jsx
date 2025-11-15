import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { Toaster, toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      toast.error("Username, email and password are required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        fullName: form.fullName.trim() || null,
      };

      const res = await axiosInstance.post("/auth/signup", payload);

      if (res?.data?.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(res?.data?.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-md bg-[#161b22] text-white">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Create your HostingAnywhere account</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-2">
              <Label>Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  name="username"
                  placeholder="johndoe"
                  className="pl-10 bg-transparent"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                name="fullName"
                placeholder="John Doe"
                className="bg-transparent"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  className="pl-10 bg-transparent"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-transparent"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </Button>

            <p className="text-sm text-center mt-3 text-gray-300">
              Already have an account?{" "}
              <span
                className="text-indigo-400 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>

      <Toaster position="top-right" />
    </div>
  );
};

export default Signup;
