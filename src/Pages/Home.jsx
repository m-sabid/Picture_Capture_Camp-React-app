import HeaderSlider from "../Components/Pages/Home/HeaderSlider";
import PopularClassesPage from "../Components/Pages/Home/PopularClasses";
import PopularInstructors from "../Components/Pages/Home/PopularInstructors";

const Home = () => {
  return (
    <div>
      <HeaderSlider />
      <PopularClassesPage />
      <PopularInstructors />
    </div>
  );
};

export default Home;
