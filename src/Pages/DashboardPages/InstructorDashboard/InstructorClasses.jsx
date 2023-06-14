import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import DashboardHeader from "../../../Components/Shared/DashboardHeader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const InstructorClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [approvedClasses, setApprovedClasses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const response = await axiosSecure.get(`/api/all-classes`);
    const approvedClasses = response.data.filter(
      (email) => email.instructorEmail === user.email
    );
    const totalStudents = approvedClasses.reduce(
      (count, classItem) => count + classItem.students,
      0
    );
    setApprovedClasses(approvedClasses);
    setTotalStudents(totalStudents);
  });

  return (
    <div>
      <DashboardHeader
        title={"Instructor Classes"}
        subtitle={"All approved classes"}
      />
      <div className="flex justify-around">
        <div className="bg-tertiary m-10 rounded-md text-white">
          <h2 className="text-2xl my-5 mx-10 border-b-2 p-3">
            Approved classes
            <span className="font-bold"> - {approvedClasses.length}</span>
          </h2>
        </div>
        <div className="bg-tertiary m-10 rounded-md text-white">
          <h2 className="text-2xl my-5 mx-10 border-b-2 p-3">
            Total Students
            <span className="font-bold"> - {totalStudents}</span>
          </h2>
        </div>
      </div>

      {/* My Classes */}
      <h2 className="text-2xl my-5 mx-10 border-b-2 p-3">Approved classes</h2>
      <div className="mx-10 grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        {approvedClasses.map((res) => (
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

export default InstructorClasses;
