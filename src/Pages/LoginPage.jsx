import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signInWithEmail(email, password);
      // Redirect user after successful login
      navigate("/"); 
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Redirect user after successful login
      navigate("/"); 
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <div>
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
          <div>
            <label htmlFor="password" className="text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true })}
                className="input input-bordered w-full max-w-xs"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-primary text-white rounded py-2 px-4 hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="flex flex-col justify-center text-center">
          <div className="col-span-2 mx-auto">
            <button
              type="button"
              className="bg-red-500 text-white rounded py-2 px-4 flex items-center justify-center gap-4 hover:bg-red-600 mt-2"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle /> Sign In with Google
            </button>
          </div>
          <div className="text-gray-800">
            Don't have an account?
            <Link to={"/signup-page"} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
