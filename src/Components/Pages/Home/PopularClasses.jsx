import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { FiUsers } from "react-icons/fi";
import BASE_URL from "../../Shared/baseurl";

const PopularClassesPage = () => {
  const {
    data: popularClasses,
    isLoading,
    isError,
  } = useQuery("popularClasses", fetchPopularClasses);

  async function fetchPopularClasses() {
    try {
      const response = await axios.get(`${BASE_URL}/api/classes/popular`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching popular classes");
    }
  }

  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (isError) {
    return <p>Error fetching popular classes</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Classes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {popularClasses.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={classItem.image}
              alt={classItem.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
              <p className="flex items-center text-gray-600">
                <FiUsers className="mr-1" />
                {classItem.students} students
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClassesPage;
