import { Navigate, Route, Routes } from "react-router-dom";
import { Footer, Nav } from "../../client/components";
import { LoginPage, RegisterPage } from "../pages";

export const SecurityRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-800 w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover">
      <Nav />
      <div className="px-10">
        <div className="min-h-screen flex flex-col ">
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/*' element={<Navigate to={"/security/login"} />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
