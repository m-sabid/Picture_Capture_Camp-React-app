import HeaderSlider from "../Components/Pages/Home/HeaderSlider";
import PopularClassesPage from "../Components/Pages/Home/PopularClasses";
import PopularInstructors from "../Components/Pages/Home/PopularInstructors";
import UserReview from "../Components/Pages/Home/UserReview";




const Home = () => {
  return (
    <div>
      <HeaderSlider />
      <PopularClassesPage />
      <PopularInstructors />
      <UserReview />
    </div>
  );
};

export default Home;
