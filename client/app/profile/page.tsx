"use client";

import { AuthProvider } from "@/context/AuthContext";
import ProfilePage from "@/components/ProfilePage";

export default function Profile() {
  return (
    <AuthProvider>
      <ProfilePage />
    </AuthProvider>
  );
}
