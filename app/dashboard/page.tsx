"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setLoading(false);
    }
    checkUser();
  }, [router]);
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome! 🎉
        </h1>
        <p className="mt-3 text-gray-500">
          You are successfully logged in.
        </p>
        <button
          onClick={handleLogout}
          className="mt-8 w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </main>
  );
}