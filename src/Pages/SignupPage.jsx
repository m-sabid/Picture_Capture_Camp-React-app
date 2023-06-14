import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import BASE_URL from "../Components/Shared/baseurl";
import Swal from "sweetalert2";

const SignupPage = () => {
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const validatePassword = (value) => {
    let error = "";

    if (value.length < 6) {
      error = "Password must be at least 6 characters long";
    } else if (!/[A-Z]/.test(value)) {
      error = "Password must contain a capital letter";
    } else if (!/[!@#$%^&*]/.test(value)) {
      error = "Password must contain a special character";
    }

    setPasswordError(error);
  };

  const onSubmit = async (data) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        photoURL,
        gender,
        phoneNumber,
        address,
      } = data;

      validatePassword(password);

      if (passwordError) {
        return;
      }

      await createUser(email, password, name, photoURL);

      const saveUser = { name, email, gender, phoneNumber, address, photoURL };

      // Send user data to the server
      fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          reset(); 
          Swal.fire({
            title: "Success!",
            text: "User created successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/");
          });
        })
        .catch((error) => {
          console.error("Error sending user data to server:", error);
        });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await googleSignIn();

      // Access the user's name and email from the Google sign-in result
      const { displayName, email, photoURL } = result.user;

      // Save the user's name and email to the server or wherever necessary
      const saveUser = { name: displayName, email, photoURL };

      // Send user data to the server
      fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          reset(); 
          Swal.fire({
            title: "Success!",
            text: "User created successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/"); 
          });
        })
        .catch((error) => {
          console.error("Error sending user data to server:", error);
        });
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/Z13y6bG/DSLR-Camera-Lens-PNG-Free-File-Download.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-10 relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-gray-800">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true })}
                className="input input-bordered w-full max-w-xs pr-10"
                onChange={(e) => validatePassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <BsEyeSlashFill className="text-gray-500" />
                ) : (
                  <BsEyeFill className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmPassword" className="text-gray-800">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                className="input input-bordered w-full max-w-xs pr-10"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <BsEyeSlashFill className="text-gray-500" />
                ) : (
                  <BsEyeFill className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">Passwords do not match</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="photoURL" className="text-gray-800">
              Photo URL
            </label>
            <input
              type="text"
              id="photoURL"
              {...register("photoURL")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="gender" className="text-gray-800">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="phoneNumber" className="text-gray-800">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              {...register("phoneNumber")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="address" className="text-gray-800">
              Address
            </label>
            <textarea
              id="address"
              {...register("address")}
              className="form-textarea mt-1 block w-full rounded-md border-gray-300"
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="text-red-500">{passwordError}</p>
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-primary text-white rounded py-2 px-4 hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="flex flex-col justify-center text-center">
          <div className="col-span-2 mx-auto">
            <button
              type="button"
              className="bg-red-500 text-white rounded py-2 px-4 flex items-center justify-center gap-4 hover:bg-red-600 mt-2"
              onClick={handleGoogleSignup}
            >
              <FaGoogle /> Sign Up with Google
            </button>
          </div>
          <div className="text-gray-800">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Go to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
