import React, { useState } from 'react';

const BookingSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking submitted!');
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
      </form>
    </section>
  );
};

export default BookingSection;
