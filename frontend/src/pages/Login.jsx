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
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/store/authSlice";
import axiosInstance from "../api/axios";
import { Toaster, toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", form);

      if (res?.data?.success) {
        dispatch(
          userLoggedIn({
            user: res.data.user,
            token: res.data.token || null,
          })
        );

        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(res?.data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);

      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-md bg-[#161b22] text-white">
        <CardHeader>
          <CardTitle>Login</CardTitle>

          <CardDescription>Sign in to access your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
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
              {loading ? "Loading..." : "Login"}
            </Button>

            <p className="text-sm text-center mt-3 text-gray-300">
              Don't have an account?{" "}
              <span
                className="text-indigo-400 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </form>
        </CardContent>
      </Card>

      <Toaster position="top-right" />
    </div>
  );
};

export default Login;
