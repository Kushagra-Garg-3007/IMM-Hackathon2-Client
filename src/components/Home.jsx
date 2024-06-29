import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useSelector } from "react-redux";

const Home = () => {
  const [scholarships, setScholarships] = useState([]);
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const authUser = useSelector((state) => state.userReducer?.authUser?.user);

  const getScholarships = async (filters = {}) => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:8000/scholarship/show?${queryParams}`, { withCredentials: true });
      setScholarships(res?.data || []);
    } catch (err) {
      setError('Failed to fetch scholarships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filters = {};
    if (nationality) filters.nationality = nationality === 'true';
    if (gender) filters.gender = gender;
    if (course) filters.course = course;

    getScholarships(filters);
  }, [nationality, gender, course]);

  const handleApply = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/scholarship/apply/${id}`, { withCredentials: true });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[89vh] bg-slate-950 border-4 rounded-md overflow-auto">
        <div className="w-1/5 border-r-4 p-4">
          <h1 className="text-white font-semibold text-lg mb-4">Filters</h1>
          <div className="mb-4">
            <label className="text-white">Nationality</label>
            <select
              className="w-full p-2 mt-2 rounded-md text-black"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">National</option>
              <option value="false">International</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-white">Gender</label>
            <select
              className="w-full p-2 mt-2 rounded-md text-black"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-white">Course</label>
            <select
              className="w-full p-2 mt-2 rounded-md text-black"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">All</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Sc">M.Sc</option>
              <option value="Commerce">Commerce</option>
            </select>
          </div>
        </div>
        <div className="flex-1 p-4 relative">
          <div className="p-6">
            {loading ? (
              <p className="text-white text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <div className="mt-4">
                <h2 className="text-2xl text-center text-white font-semibold mb-4 bg-blue-700 p-2 rounded-md">Scholarships</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scholarships.map((item) => (
                    <div
                      key={item._id}
                      className="border border-gray-700 p-6 rounded-lg flex flex-col items-center bg-gray-800 text-white transition transform duration-500 ease-in-out hover:scale-105 hover:bg-gray-700 shadow-lg"
                    >
                      <h3 className="text-xl font-bold text-center mb-2 bg-blue-600 p-2 rounded-md w-full">{item.name}</h3>
                      <h4 className="text-lg text-center mb-2 bg-green-600 p-2 rounded-md w-full">{item.amount}</h4>
                      <h5 className="text-md text-center mb-2">Nationality: {item.nationality ? "National" : "International"}</h5>
                      <h5 className="text-md text-center mb-2">Course: {item.course}</h5>
                      <h5 className="text-md text-center mb-2">Gender: {item.gender}</h5>
                      <h5 className="text-md text-center mb-2">Deadline: {formatDate(item.deadline)}</h5>
                      <p className="text-sm text-center mb-4">{item.description}</p>
                      {authUser && !authUser.isAdmin && (
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                          onClick={() => handleApply(item._id)}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
