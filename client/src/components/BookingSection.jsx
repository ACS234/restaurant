import React, { useState, useEffect } from 'react';
import { bookTable, getTable } from '../services/apiServices';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const BookingSection = () => {
  const [availableTables, setAvailableTables] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    reservation_date: '',
    reservation_time: '',
    reservation_end_time: '',
    number_of_people: '',
    table: null,
  });

  const navigate=useNavigate()

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await getTable();
        if (response.data) {
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
      toast.success(response?.message);
      setFormData({});
      setTimeout(()=>{
        navigate('/reservations')
      },2000)
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }

  return (
    <section className="relative w-full h-[650px] flex items-center justify-center px-4 py-16 text-white overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105"
  ></div>

  <div className="absolute inset-0 bg-gray-600 bg-opacity-50 "></div>

  <div className="relative text-center w-full max-w-2xl">
    <h2 className="text-4xl font-bold mb-6 text-white">Book A Table</h2>
    <ToastContainer />
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-2xl"
    >
      <input
        type="text"
        name="customer_name"
        placeholder="Your Name"
        value={formData.customer_name}
        onChange={handleChange}
        className="w-full p-3 bg-white/20 text-white placeholder-white rounded-lg shadow-md focus:outline-none"
        required
      />
      <input
        type="email"
        name="customer_email"
        placeholder="Your Email"
        value={formData.customer_email}
        onChange={handleChange}
        className="w-full p-3 bg-white/20 text-white placeholder-white rounded-lg shadow-md focus:outline-none"
        required
      />
      <select
        value={formData.table || ''}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            table: e.target.value,
          }))
        }
        className="w-full p-3 bg-white/20 text-white placeholder-white rounded-lg shadow-md focus:outline-none"
      >
        <option className='bg-white/20' value="">Select a table</option>
        {availableTables.map((table) => (
          <option className='bg-gray-600' key={table.id} value={table.table_number}>
            Table {table.table_number} (Seats: {table.seats})
          </option>
        ))}
      </select>
      <input
        type="date"
        name="reservation_date"
        value={formData.reservation_date}
        onChange={handleChange}
        className="w-full p-3 bg-white/20 text-white placeholder-white rounded-lg shadow-md focus:outline-none"
        required
      />
      <input
        type="time"
        name="reservation_time"
        value={formData.reservation_time}
        onChange={handleChange}
        className="w-full p-3 bg-white/20 text-white placeholder-white rounded-lg shadow-md focus:outline-none"
        required
      />
      <input
        type="time"
        name="reservation_end_time"
        value={formData.reservation_end_time}
        onChange={handleChange}
        className="w-full p-3 bg-white/20 text-white placeholder-white rounded-lg shadow-md focus:outline-none"
        required
      />
      <input
        type="number"
        name="number_of_people"
        placeholder="Number of People"
        value={formData.number_of_people}
        onChange={handleChange}
        className="w-full p-3 bg-white/20 text-white placeholder-white rounded-lg shadow-md focus:outline-none"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-md transition duration-300 font-semibold"
      >
        Book Now
      </button>
    </form>
  </div>
</section>

  );
};

export default BookingSection;