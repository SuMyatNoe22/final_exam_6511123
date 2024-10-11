'use client';
import Link from 'next/link';

export default function CustomerListPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      {/* Customer List Title */}
      <h1 className="text-5xl font-extrabold mb-12 text-blue-800">
        Customer List
      </h1>

      {/* Add Customer Button */}
      <Link href="/customer/add">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded text-3xl shadow-lg transform transition-all hover:scale-105">
          Add Customer
        </button>
      </Link>
    </div>
  );
}
