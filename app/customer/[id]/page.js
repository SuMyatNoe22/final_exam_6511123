'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/customer/${id}`)
        .then((res) => res.json())
        .then((data) => setCustomer(data));
    }
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{customer.name}</h1>
      <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests}</p>
    </div>
  );
}
