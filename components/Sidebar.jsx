"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 bg-slate-800 text-white p-4 h-screen">
      <div className="text-2xl font-bold mb-4 mt-6">Dashboard</div>
      <div className="space-y-2">
        <Link href="/dashboard">
          <div className="px-2 py-2 mt-10 text-center rounded-lg bg-black">Details</div>
        </Link>
      </div>
    </div>
  );
}
