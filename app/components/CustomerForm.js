"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomerForm({ onSubmit, initialData }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("dateOfBirth", initialData.dateOfBirth);
      setValue("memberNumber", initialData.memberNumber);
      setValue("interests", initialData.interests);
    }
  }, [initialData, setValue]);

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {initialData ? "Edit Customer" : "Add Customer"} {/* Conditional Title */}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Customer Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <label htmlFor="dateOfBirth" className="block text-gray-700 font-bold mb-2">Date of Birth</label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Member Number */}
          <div className="mb-6">
            <label htmlFor="memberNumber" className="block text-gray-700 font-bold mb-2">Member Number</label>
            <input
              id="memberNumber"
              name="memberNumber"
              type="number"
              {...register("memberNumber", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label htmlFor="interests" className="block text-gray-700 font-bold mb-2">Interests</label>
            <input
              id="interests"
              name="interests"
              type="text"
              {...register("interests", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Submit Button - Conditional Text */}
          <div className="flex justify-end">
            <input
              type="submit"
              value={initialData ? "Update Customer" : "Add Customer"} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
          </div>
        </form>
      </Typography>
    </Box>
  );
}
