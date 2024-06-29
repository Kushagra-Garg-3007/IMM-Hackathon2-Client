import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const CreateScholarship = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    nationality: false,
    description: '',
    course: '',
    gender: 'any',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://scholarship-ybb2.onrender.com/scholarship/add', formData, { withCredentials: true })
      .then((response) => {
        console.log('Scholarship added successfully:', response.data);
        // Reset form
        setFormData({
          name: '',
          amount: '',
          nationality: false,
          description: '',
          course: '',
          gender: 'any',
          deadline: ''
        });
      })
      .catch((err) => {
        console.error('Error adding scholarship:', err);
      });
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-white font-bold mb-2">
            Scholarship Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-white font-bold mb-2">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="label cursor-pointer">
            <span className="label-text"> Is National</span>
            <input
              type="checkbox"
              name="nationality"
              checked={formData.nationality}
              onChange={handleChange}
              className="checkbox"
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-white font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="course" className="block text-white font-bold mb-2">
            Course
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-white font-bold mb-2">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-white font-bold mb-2">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Scholarship
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateScholarship;
