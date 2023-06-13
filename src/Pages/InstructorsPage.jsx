import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import SiteHeaderTitle from "../Components/Shared/SiteHeaderTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";

const InstructorsPage = () => {
  const [axiosSecure] = useAxiosSecure();

  const [instructors, setInstructors] = useState([]);

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const response = await axiosSecure.get(`/users`);
    console.log(response.data);
    const totalInstructors = response.data.filter(
      (email) => email.role === "instructor"
    );
    setInstructors(totalInstructors);
  });
  return (
    <div>
      <SiteHeaderTitle title={"Instructors"} subtitle={"Page"} />
      <div className="container mx-auto py-8 my-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={instructor.photoURL ? instructor.photoURL : "https://img.freepik.com/free-icon/user_318-159711.jpg"}
                alt={instructor.name}
                className="w-full h-40 object-cover"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;
