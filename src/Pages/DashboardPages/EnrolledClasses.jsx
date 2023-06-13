import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import DashboardHeader from "../../Components/Shared/DashboardHeader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EnrolledClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [enrolledClasses, setEnrolledClasses] = useState([]);

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const response = await axiosSecure.get(`/api/enrolled`);
    setEnrolledClasses(
      response.data.filter((email) => email.email === user.email)
    );
  });

  return (
    <div>
      <DashboardHeader title={"Enrolled Classes"} />

      <div className="mx-10 grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        {enrolledClasses.map((res) => (
          <div key={res._id} className="">
            <div className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img
                  src={res.itemImage}
                  alt="Shoes"
                  className="h-44 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-blue-500">{res.itemNames}</h2>
                <h2 className="">
                  <strong> Instructor: </strong> {res.instructorName}
                </h2>
                <h2 className="">
                  <strong> Email: </strong> {res.instructorEmail}
                </h2>
                <hr />
                <ul className="my-2 bg-gray-100 p-3 rounded-md">
                  <li className="flex items-center gap-2 ml-2">
                    <FaChevronCircleRight /> <strong> Price: </strong>$
                    {res.price}
                  </li>
                  <li className="flex items-center gap-2 ml-2">
                    <FaChevronCircleRight /> <strong> Seats: </strong>
                    {res.seats}
                  </li>
                  <li className="flex items-center gap-2 ml-2">
                    <FaChevronCircleRight /> <strong> Students: </strong>
                    {res.students}
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

export default EnrolledClasses;
