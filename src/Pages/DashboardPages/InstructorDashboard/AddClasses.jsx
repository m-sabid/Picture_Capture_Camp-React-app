import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DashboardHeader from "../../../Components/Shared/DashboardHeader";
import useInstructor from "../../../hooks/useInstructor";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddClasses = () => {
  const { instructorName, instructorEmail } = useInstructor();
  const { handleSubmit, register, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      // Add instructorEmail and instructorName to the data object
      const requestData = {
        ...data,
        instructorEmail,
        instructorName,
      };

      // Make a POST request to the endpoint
      const response = await axiosSecure.post("/api/classes", requestData);
      if (response.data.success) {
        // Instructor data was successfully added
        Swal.fire("Success", "Added A Class Successfully", "success");
        reset();
      } else {
        // Failed to add the instructor data
        Swal.fire("Error", "Failed to add instructor data", "error");
      }
    } catch (error) {
      console.error("Error adding instructor data:", error);
      Swal.fire("Error", "Internal Server Error", "error");
    }
  };

  return (
    <>
      <DashboardHeader title={"Add Class"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 p-4 my-10 mx-5 rounded-xl"
      >
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Class Name
          </label>
          <input
            type="text"
            id="title"
            className="input input-bordered w-full"
            {...register("title", { required: true })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="form-label">
            Class Image
          </label>
          <input
            type="link"
            id="image"
            className="input input-bordered w-full"
            {...register("image", { required: true })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="instructorName" className="form-label">
            Instructor Name
          </label>
          <input
            type="text"
            id="instructorName"
            className="input input-bordered w-full"
            value={instructorName}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="instructorEmail" className="form-label">
            Instructor Email
          </label>
          <input
            type="email"
            id="instructorEmail"
            className="input input-bordered w-full"
            value={instructorEmail}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="seats" className="form-label">
            Available Seats
          </label>
          <input
            type="number"
            id="seats"
            className="input input-bordered w-full"
            {...register("seats", { required: true })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="input input-bordered w-full"
            {...register("price", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="btn bg-primary text-secondary hover:text-gray-600"
        >
          Add Class
        </button>
      </form>
    </>
  );
};

export default AddClasses;
