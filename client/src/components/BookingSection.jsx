import React, { useState } from 'react';
import axios from 'axios';

const BookingSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/reservations/book/', {
        customer_name: name,
        customer_email: email,
        reservation_date: date,
        reservation_time: time,
        number_of_people: people,
        table: 1 // assuming you're booking Table ID 1
      });

      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('An error occurred while booking.');
      }
    }
  };

  return (
    <section className="py-16 px-4 bg-red-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-6">Book A Table</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-red-400 rounded-lg shadow-lg focus:outline-none"
          required 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-red-400 rounded-lg shadow-lg focus:outline-none"
          required 
        />
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 bg-red-400 rounded-lg shadow-lg focus:outline-none"
          required 
        />
        <input 
          type="time" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 bg-red-400 rounded-lg shadow-lg focus:outline-none"
          required 
        />
        <input 
          type="number" 
          placeholder="Number of People"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="w-full p-3 bg-red-400 rounded-lg shadow-lg focus:outline-none"
          required 
        />
        <button type="submit" className="bg-white text-red-600 py-2 px-6 rounded-full hover:bg-gray-200">Book Now</button>

        {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
      </form>
    </section>
  );
};

export default BookingSection;
