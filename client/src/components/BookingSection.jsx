import React, { useState, useEffect } from 'react';
import { bookTable, getTable } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
const BookingSection = () => {
  const [availableTables, setAvailableTables] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    reservation_date: '',
    reservation_time: '',
    number_of_people: '',
    table: null,
  });


  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await getTable();
        console.log("response",response.data)
        if (response.data) {
          console.log("table data",response.data)
          setAvailableTables(response.data);
        } else {
          toast.error('No available tables at the moment.');
        }
      } catch (error) {
        toast.error(`Failed to fetch table info: ${error.message}`);
      }
    };
    fetchTable();
  }, []);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.table) {
      toast.error('Cannot submit without a table ID.');
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await bookTable(data);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred while booking.');
      }
    }
  };

  return (
    <section className="py-16 px-4 bg-green-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-6">Book A Table</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          name="customer_name"
          placeholder="Your Name"
          value={formData.customer_name}
          onChange={handleChange}
          className="w-full p-3 bg-green-400 text-zinc-900 rounded-lg shadow-lg focus:outline-none"
          required
        />
        <input
          type="email"
          name="customer_email"
          placeholder="Your Email"
          value={formData.customer_email}
          onChange={handleChange}
          className="w-full p-3 bg-green-400 text-zinc-900 rounded-lg shadow-lg focus:outline-none"
          required
        />
        <select
          value={formData.table || ''}
          className="w-full p-3 bg-green-400 text-zinc-900 rounded-lg shadow-lg focus:outline-none"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              table: e.target.value,
            }))
          }
        >
          <option value="" className="w-full p-3 bg-green-400 text-zinc-900 rounded-lg shadow-lg focus:outline-none">Select a table</option>
          {availableTables.map((table) => (
            <option key={table.id} value={table.table_number} className="w-full p-3 bg-red-400 rounded-lg shadow-lg focus:outline-none">
              Table {table.table_number} (Seats: {table.seats})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="reservation_date"
          value={formData.reservation_date}
          onChange={handleChange}
          className="w-full p-3 bg-green-400 text-zinc-900 rounded-lg shadow-lg focus:outline-none"
          required
        />
        <input
          type="time"
          name="reservation_time"
          value={formData.reservation_time}
          onChange={handleChange}
          className="w-full p-3 bg-green-400 text-zinc-900 rounded-lg shadow-lg focus:outline-none"
          required
        />
        <input
          type="number"
          name="number_of_people"
          placeholder="Number of People"
          value={formData.number_of_people}
          onChange={handleChange}
          className="w-full p-3 bg-green-400 text-zinc-900 rounded-lg shadow-lg focus:outline-none"
          required
        />
        <button type="submit" className="bg-white text-red-600 py-2 px-6 rounded-md hover:bg-green-300">
          Book Now
        </button>
      </form>
    </section>
  );
};

export default BookingSection;