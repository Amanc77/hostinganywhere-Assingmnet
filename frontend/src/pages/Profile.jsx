import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "lucide-react";
import axiosInstance from "../api/axios";

const emptyProfile = { email: "", username: "", full_name: "", phone: "" };

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(emptyProfile);
  const [initial, setInitial] = useState(emptyProfile);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/user/me");
      if (res.data?.success && res.data.user) {
        const u = {
          email: res.data.user.email || "",
          username: res.data.user.username || "",
          full_name: res.data.user.full_name || "",
          phone: res.data.user.phone || "",
        };
        setProfile(u);
        setInitial(u);
      } else {
        toast.error(res.data?.message || "Failed to load profile");
      }
    } catch (err) {
      console.error("fetchProfile:", err);
      toast.error(err?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const buildPayload = () => {
    const payload = {};
    if (profile.username !== initial.username)
      payload.username = profile.username;
    if (profile.full_name !== initial.full_name)
      payload.fullName = profile.full_name;
    if (profile.phone !== initial.phone) payload.phone = profile.phone;
    return payload;
  };

  const hasChanges = () => Object.keys(buildPayload()).length > 0;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!hasChanges()) {
      toast("No changes to save");
      return;
    }

    const payload = buildPayload();
    setSaving(true);
    try {
      const res = await axiosInstance.put("/user/me", payload);

      if (res.data?.success && res.data.user) {
        const u = {
          email: res.data.user.email ?? profile.email,
          username: res.data.user.username ?? profile.username,
          full_name: res.data.user.full_name ?? profile.full_name,
          phone: res.data.user.phone ?? profile.phone,
        };
        setProfile(u);
        setInitial(u);
        toast.success("Profile updated");
      } else {
        toast.error(res.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("update:", err);
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-14">
      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="h-8 w-8 text-indigo-400" />
            <h1 className="text-4xl font-bold text-indigo-400">My Profile</h1>
          </div>
          <p className="text-gray-400">
            Edit the fields you want to update. Email is read-only.
          </p>
        </header>

        <Card className="bg-[#07111a] text-white border border-gray-800 shadow-md rounded-lg overflow-hidden">
          <CardHeader className="px-6  py-5">
            <CardTitle className="text-lg">Profile</CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Only changed fields will be sent to the server.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-6">
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label>Email (read-only)</Label>
                <Input
                  value={profile.email}
                  disabled
                  className="bg-gray-800 text-white rounded-md"
                />
              </div>

              <div>
                <Label>Username</Label>
                <Input
                  value={profile.username}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, username: e.target.value }))
                  }
                  className="bg-gray-800 text-white rounded-md"
                  required
                />
              </div>

              <div>
                <Label>Full name</Label>
                <Input
                  value={profile.full_name}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, full_name: e.target.value }))
                  }
                  className="bg-gray-800 text-white rounded-md"
                  placeholder="Optional"
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  type="number"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="bg-gray-800 text-white rounded-md"
                  placeholder="+91xxxxxxxxxx"
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={saving || !hasChanges()}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
