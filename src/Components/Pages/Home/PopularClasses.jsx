import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers } from "react-icons/fi";
import BASE_URL from "../../Shared/baseurl";
import Reveal, { Fade } from "react-awesome-reveal";

const PopularClassesPage = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    fetchPopularClasses();
  }, []);

  async function fetchPopularClasses() {
    try {
      const response = await axios.get(`${BASE_URL}/api/popular-classes`);
      setPopularClasses(response.data);
    } catch (error) {
      console.error("Error fetching popular classes", error);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularClasses.map((classItem) => (
          <Reveal key={classItem._id} duration={600}>
            <Fade>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {classItem.title}
                  </h3>
                  <p className="flex items-center text-gray-600">
                    <FiUsers className="mr-1" />
                    {classItem.students} students
                  </p>
                </div>
              </div>
            </Fade>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default PopularClassesPage;
