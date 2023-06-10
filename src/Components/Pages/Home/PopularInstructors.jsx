import React from "react";
import axios from "axios";
import BASE_URL from "../../Shared/baseurl";
import { useQuery } from "@tanstack/react-query";

const PopularInstructors = () => {
  const {
    data: popularInstructors,
    isLoading,
    isError,
  } = useQuery("popularInstructors", fetchPopularInstructors);

  async function fetchPopularInstructors() {
    try {
      const response = await axios.get(`${BASE_URL}/api/instructors/popular`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching popular instructors");
    }
  }

  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (isError) {
    return <p>Error fetching popular instructors</p>;
  }

  return (
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
      <h2 className="text-2xl font-bold mb-6">Popular instructors</h2>
      {popularInstructors?.slice(0, 6).map((instructor) => (
        <div
          key={instructor._id}
          className="rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={instructor.image}
            alt={instructor.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
            <p className="text-gray-600">
              Classes: {instructor.classes.length}
            </p>
            {/* Add any additional relevant information */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularInstructors;
