import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderForm = () => {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_HEADER', payload: { [name]: value } });
  };
  

  return (
    <div className=" p-4 rounded shadow-md mb-6 w-4/5">
      <h1 className="text-xl font-bold text-center mb-4">Header</h1>

      <div className="grid grid-cols-6 gap-4 bg-gray-200 p-4 rounded">

        <div className="col-span-2">
          <label htmlFor="vr_no" className="block text-sm font-medium text-gray-700">Vr No:</label>
          <input
            id="vr_no"
            name="vr_no"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            value={header.vr_no}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="vr_date" className="block text-sm font-medium text-gray-700">Vr Date:</label>
          <input
            id="vr_date"
            name="vr_date"
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            value={header.vr_date}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status"
            name="status"
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            value={header.status}
            onChange={handleChange}
          >
            <option value="A">A</option>
            <option value="I">I</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Ac Amt:</label>
          <input
            readOnly
            value={header.ac_amt}
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1 bg-gray-100"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="ac_name" className="block text-sm font-medium text-gray-700">Account Name:</label>
          <input
            id="ac_name"
            name="ac_name"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            value={header.ac_name}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-6 text-right">
  
        </div>
      </div>
  
    </div>
    
  );
};
export const validateHeader = (header) => {
  if (!header.vr_no || header.vr_no.trim() === "") {
    alert("Voucher number is required.");
    return false;
  }

  if (!header.vr_date) {
    alert("Voucher date is required.");
    return false;
  }

  if (!header.ac_name || header.ac_name.trim() === "") {
    alert("Account name is required.");
    return false;
  }

  if (!["A", "I"].includes(header.status)) {
    alert("Status must be A or I.");
    return false;
  }

  return true;
};

export default HeaderForm;
