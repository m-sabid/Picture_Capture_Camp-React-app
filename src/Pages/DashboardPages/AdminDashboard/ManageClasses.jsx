import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import DashboardHeader from "../../../Components/Shared/DashboardHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClasses = () => {
  const [showModal, setShowModal] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/api/classes`);
    console.log(res, "I am from m-class");
    return res.data;
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/api/classes/${id}`, {
        status: "approved",
      });
      refetch();
      setShowModal(true);
    } catch (error) {
      console.error("Error approving class:", error);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axiosSecure.patch(`/api/classes/${id}`, {
        status: "denied",
      });
      refetch();
      setShowModal(true);
    } catch (error) {
      console.error("Error denying class:", error);
    }
  };

  const handleSendFeedback = async () => {
    try {
      await axiosSecure.post(`/api/send-feedback`, {
        selectedClass,
        feedback,
      });

      // Clear the feedback and close the modal
      setFeedback("");
      //   setShowModal(false);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <div>
      <DashboardHeader title={"Manage Classes"} />
      {/* <h1>Hello{classes.length}</h1> */}


      {/* Modal */}
      {showModal && (
        <div className="modal z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Send Feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              rows={4}
            ></textarea>
            <div className="modal-action">
              <button onClick={handleSendFeedback} className="btn">Send</button>
              <button onClick={() => setShowModal(false)} className="btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <button className="btn" onClick={()=>setShowModal(true)}>Open modal</button>


      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-12">
        {classes.map((res) => {
          console.log(res);
          return (
            <div key={res._id} className=" mx-10">
              <div className="card card-compact bg-base-100 shadow-xl">
                <figure>
                  <img src={res.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-blue-500">{res.title}</h2>
                  <h2 className="">
                    <strong> Instructor: </strong> {res.instructorName}
                  </h2>
                  <h2 className="">
                    <strong> Instructor: </strong> {res.instructorEmail}
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
                  </ul>
                  <hr />
                  <div className="card-actions justify-end">
                    <button
                      disabled="disabled"
                      className="bg-gray-300 rounded-md text-primary p-2"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleApprove(res._id)}
                      className="bg-green-500 rounded-md text-primary hover:bg-secondary hover:text-primary p-2"
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => handleDeny(res._id)}
                      className="bg-red-300 rounded-md text-primary hover:bg-red-600 hover:text-white p-2"
                    >
                      Denied
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageClasses;
