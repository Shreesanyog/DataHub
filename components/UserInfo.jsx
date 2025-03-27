// "use client";

// import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";

// export default function UserInfo() {
//   const { data: session } = useSession();

//   return (
//     <div className="grid place-items-center h-screen">
//       <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
//         <div>
//           Name: <span className="font-bold">{session?.user?.name}</span>
//         </div>
//         <div>
//           Email: <span className="font-bold">{session?.user?.email}</span>
//         </div>
//         <button
//           onClick={() => signOut()}
//           className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
//         >
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    if (!session?.user?.id) {
      alert("No user ID found.");
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await fetch("/api/deleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }), // Send the user ID
      });

      if (response.ok) {
        // Clear local storage and log out the user
        localStorage.removeItem("user");
        signOut();
        alert("Account deleted successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting the account.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 border border-gray-300 rounded bg-white flex items-center space-x-2"
      >
        <span>{session?.user?.name}</span>
        <span className="ml-2">{session?.user?.email}</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-48">
          <div className="px-4 py-2 cursor-pointer hover:bg-gray-100">
            <span>Logout</span>
            <button
              onClick={() => {
                signOut();
                localStorage.removeItem("user");
              }}
              className="ml-4 text-red-500"
            >
              Logout
            </button>
          </div>
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={handleDeleteAccount}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </div>
        </div>
      )}
    </div>
  );
}

