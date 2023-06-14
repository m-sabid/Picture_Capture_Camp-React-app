import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import DashboardHeader from "../../../Components/Shared/DashboardHeader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const InstructorFeedback = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [classFeedback, setClassFeedback] = useState([]);

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const response = await axiosSecure.get(`/api/all-classes`);
    setClassFeedback(
      response.data.filter(
        (email) =>
          email.instructorEmail === user.email && email.feedback.length >= 2
      )
    );
  });
  return (
    <div>
      <div className="mx-10 grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        {classFeedback.map((res) => (
          <div key={res._id} className="">
            <div className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img
                  src={res.image}
                  alt="Shoes"
                  className="h-44 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-blue-500">{res.title}</h2>
                <h2 className="">
                  <strong> Price: </strong> {res.price}
                </h2>
                <hr />
                <ul className="my-2 bg-gray-100 p-3 rounded-md">
                  <p className="bg-gray-400 w-fit px-4 rounded-md mb-3">
                    <strong>Feedback</strong>
                  </p>
                  <li className="flex items-center gap-2 ml-2 text-green-600">
                    <FaChevronCircleRight />
                    {res.feedback}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorFeedback;
