'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomerForm from '@/app/components/CustomerForm';
import Link from 'next/link';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);  // For editing
  const [open, setOpen] = useState(false);

  const columns = [
    {
      field: 'name',
      headerName: 'Customer Name',
      width: 200,
      renderCell: (params) => (
        <Link href={`/customer/${params.row.id}`} className="text-blue-500 underline">
          {params.row.name}
        </Link>
      ),
    },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 150 },
    { field: 'memberNumber', headerName: 'Member Number', width: 150 },
    { field: 'interests', headerName: 'Interests', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEditCustomer(params.row)}
            size="small"
            aria-label="edit"
          >
            ✏️
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDeleteCustomer(params.row.id)}
            size="small"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const response = await fetch('/api/customer');
    const data = await response.json();
    const formattedCustomers = data.map((customer) => ({
      ...customer,
      id: customer._id,  // DataGrid expects "id"
    }));
    setCustomers(formattedCustomers);
  }

  const handleFormSubmit = async (data) => {
    const method = currentCustomer ? "PUT" : "POST";
    const url = currentCustomer
      ? `/api/customer/${currentCustomer._id}`  // Edit
      : `/api/customer`;  // Add

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    fetchCustomers();
    setOpen(false);
  };

  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer);  // Set the current customer for editing
    setOpen(true);  // Open the modal
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await fetch(`/api/customer/${id}`, {
        method: 'DELETE',
      });
      fetchCustomers();
    }
  };

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Customer Management</h1>

      <div className="mb-4 flex justify-between items-center">
        <span>Customers ({customers.length})</span>
        <IconButton
          aria-label="new-customer"
          color="primary"
          onClick={() => {
            setCurrentCustomer(null);  // Clear current customer when adding
            setOpen(true);
          }}
        >
          <AddBoxIcon fontSize="large" />
        </IconButton>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <CustomerForm
          onSubmit={handleFormSubmit}
          initialData={currentCustomer}  // Pass current customer for editing, or null for adding
        />
      </Modal>

      <div className="bg-white p-4 shadow rounded">
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </main>
  );
}
