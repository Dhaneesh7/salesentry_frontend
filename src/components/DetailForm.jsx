import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailForm = () => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const totalAmount = useSelector((state) => state.header.ac_amt); 
  const [items, setItems] = useState([]);

// use useEffect for fetching item code from db and use in form to select items

  useEffect(() => {
    const fetchItems = async () => {           
      try {
        const res = await axios.get('http://5.189.180.8:8010/item');
        setItems(res.data);
      } catch (err) {
        console.log("error fetching items", err);
      }
    };

    fetchItems();
  }, []);

  // handleChange for update row for detail form/table

  const handleChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_DETAIL_ROW',
      payload: { index, field, value },
    });
  };



  return (
    <div className=" w-4/5 mx-auto mt-6 ml-2">
      <div className="flex justify-between items-left mb-4 bg-gray-200 p-4 rounded">
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Detail Form
        </h1>

        <button
          className="btn bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch({ type: 'ADD_DETAIL_ROW' })}  //for adding new row in table
        >
          + Add Row
        </button>
      </div>

      <table className="w-full table-auto bg-white rounded shadow-md border border-gray-300">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="px-4 py-2">Sr No</th>
            <th className="px-4 py-2">Item Code</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Rate</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {detail.map((row, index) => {
            const qty = parseFloat(row.qty) || 0;
            const rate = parseFloat(row.rate) || 0;
            const amount = (qty * rate).toFixed(2);

            return (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{index + 1}</td>

                <td className="px-4 py-2">

                
                  <select   //selecting item code fetched from db
                    className="w-full border rounded px-2 py-1"
                    value={row.item_code}
                    onChange={(e) => {
                      const selectedCode = e.target.value;
                      const selectedItem = items.find(item => item.item_code === selectedCode);
                      handleChange(index, "item_code", selectedCode);
                      if (selectedItem) {
                        handleChange(index, "item_name", selectedItem.item_name);
                      }
                    }}
                  >
                    <option value="">Select Item</option>
                    {items.map((item, idx) => (
                      <option key={idx} value={item.item_code}>
                        {item.item_code}
                      </option>
                    ))}
                  </select>

                </td>

                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={row.item_name}
                    onChange={(e) =>
                      handleChange(index, "item_name", e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={row.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                  />
                </td>


                <td className="px-4 py-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border rounded px-2 py-1"
                    value={row.qty}
                    onChange={(e) =>
                      handleChange(index, "qty", e.target.value)
                    }
                  />
                </td>

                <td className="px-4 py-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border rounded px-2 py-1"
                    value={row.rate}
                    onChange={(e) =>
                      handleChange(index, "rate", e.target.value)
                    }
                  />
                </td>

                <td className="px-4 py-2 text-right">{amount}</td>

                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() =>
                      dispatch({ type: "REMOVE_DETAIL_ROW", payload: index })
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        className="btn mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => {
          if (validateDetails(detail)) {     //callling validatedetails for validate detail table
            dispatch({ type: 'CALCULATE_AMOUNT' });   //dispatch for calculate total amount
          }
        }}
      >
        Calculate Total
      </button>

      <div className="total-amount mt-4">
        <h2 className="text-lg font-bold">Total Amount: {totalAmount}</h2>
      </div>
    </div>
  );
};
export const validateDetails = (detail) => {     //validate detailtable function
  if (!detail.length) {
    alert("Please add at least one item row.");
    return false;
  }

  for (let i = 0; i < detail.length; i++) {
    const row = detail[i];
    if (!row.item_code || !row.item_name || row.qty === "" || row.rate === "") {
      alert(`Row ${i + 1}: All fields are required.`);
      return false;
    }

    const qty = parseFloat(row.qty);
    const rate = parseFloat(row.rate);

    if (isNaN(qty) || qty <= 0) {
      alert(`Row ${i + 1}: Quantity must be greater than 0.`);
      return false;
    }

    if (isNaN(rate) || rate < 0) {
      alert(`Row ${i + 1}: Rate must be 0 or higher.`);
      return false;
    }
  }

  return true;
};

export default DetailForm;
