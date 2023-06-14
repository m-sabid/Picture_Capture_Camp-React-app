import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../Shared/baseurl";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchPopularInstructors();
  }, []);

  async function fetchPopularInstructors() {
    try {
      const response = await axios.get(`${BASE_URL}/api/popular-instructors`);
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching popular instructors", error);
    }
  }

  return (
    <div className="container mx-auto my-20 ">
      <h2 className="text-2xl font-bold mb-6">Popular instructors</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {instructors.map((instructor) => (
          <Fade>
            <div
              key={instructor._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={
                  instructor.photoURL
                    ? instructor.photoURL
                    : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                }
                alt={instructor.name}
                className="h-40 mx-auto text-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {instructor.name}
                </h3>
                <p className="flex items-center text-gray-600">
                  <FaEnvelopeOpenText className="mr-1" />
                  <span className="text-blue-400 font-bold mx-2">
                    {instructor.email}
                  </span>
                </p>
                <h4 className="bg-gray-100 my-2 p-2 rounded-md font-semibold">
                  Total Classes: {instructor.totalClasses}
                </h4>
                <h4 className="bg-gray-100 my-2 p-2 rounded-md font-semibold">
                  Total Classes: {instructor.totalStudents}
                </h4>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
