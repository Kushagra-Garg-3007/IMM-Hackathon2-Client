import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import Navbar from './Navbar';

const Applied = () => {
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const authUser = useSelector((state) => state.userReducer?.authUser?.user);

  const getAppliedScholarships = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:8000/scholarship/showApplied', { withCredentials: true });
      console.log(res)
      setAppliedScholarships(res?.data?.applied || []);
    } catch (err) {
      setError('Failed to fetch applied scholarships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      getAppliedScholarships();
    }
  }, [authUser]);

  console.log(appliedScholarships);
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl mb-4">Applied Scholarships</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedScholarships.length === 0 ? (
              <p className="text-center">No scholarships applied yet.</p>
            ) : (
              appliedScholarships.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-700 p-6 rounded-lg flex flex-col items-center bg-gray-800 text-white transition transform duration-500 ease-in-out hover:scale-105 hover:bg-gray-700 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-center mb-2 bg-blue-600 p-2 rounded-md w-full">Name: {item.name}</h3>
                  <h4 className="text-lg text-center mb-2 bg-green-600 p-2 rounded-md w-full">Staus: {item.approved}</h4>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Applied;
