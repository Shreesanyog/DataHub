"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gradient-to-r from-gray-950 to-blue-400 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Logo</div>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <div className="text-sm">
              Welcome, <span className="font-semibold">{session.user.name}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signOut()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}
