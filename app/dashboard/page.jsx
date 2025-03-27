"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

// Sample data that simulates fetching from MongoDB or an API
const mockData = [
  { id: 1, name: "a", email: "a@example.com" },
  { id: 2, name: "b", email: "b@example.com" },
  { id: 3, name: "c", email: "c@example.com" },
  { id: 4, name: "d", email: "d@example.com" },
  { id: 5, name: "e", email: "e@example.com" },
  { id: 6, name: "f", email: "f@example.com" },
  { id: 7, name: "g", email: "g@example.com" },
  { id: 8, name: "h", email: "h@example.com" },
];

export default function Dashboard() {
  const [data, setData] = useState(mockData); // Simulated data
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Items per page
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name"); // Default sorting column
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  // Sorting logic
  const handleSort = (column, order) => {
    setSortColumn(column);
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  // Searching logic
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <div className="w-64 fixed top-0 left-0 h-full bg-slate-300 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64 overflow-y-auto">
        {/* Navbar Component */}
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <Navbar />
        </div>

        <div className="mt-8 px-8 py-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>

          {/* Search, Sort Dropdown, and Pagination Controls */}
          <div className="flex items-center justify-between mb-6 space-x-6">
            {/* Search Box */}
            <input
              type="text"
              placeholder="Search..."
              className="p-3 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Sorting Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-5 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 flex items-center space-x-2 hover:bg-gray-100 transition-all duration-300"
              >
                <span>Sort by: {sortColumn.charAt(0).toUpperCase() + sortColumn.slice(1)}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({sortOrder === "asc" ? "Asc" : "Desc"})
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48 z-10">
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2"
                    onClick={() => {
                      handleSort("name", sortOrder === "asc" ? "desc" : "asc");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span>Name</span>
                    <span className="ml-2 text-xs">
                      ({sortOrder === "asc" ? "Desc" : "Asc"})
                    </span>
                  </div>
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2"
                    onClick={() => {
                      handleSort("email", sortOrder === "asc" ? "desc" : "asc");
                      setIsDropdownOpen(false);
                    }}
                  >
                    
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Total: {filteredData.length} items</div>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-gray-300 transition-all duration-300"
              >
                Prev
              </button>
              <span className="mx-4 text-lg text-gray-700">{currentPage}</span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage * rowsPerPage >= filteredData.length}
                className="px-4 py-2 border rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-gray-300 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>

          {/* Table with Sorting, Pagination, and Searching */}
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-indigo-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600">Name</th>
                <th className="p-4 text-left font-semibold text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-indigo-50 cursor-pointer transition-all duration-300"
                >
                  <td className="p-4 border-b text-gray-700">{row.name}</td>
                  <td className="p-4 border-b text-gray-700">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
