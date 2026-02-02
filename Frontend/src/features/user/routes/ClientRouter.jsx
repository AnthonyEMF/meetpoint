import { Footer, Nav } from "../components";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  HomePage,
  MainPage,
  UserPage,
  EventPage,
  CreateEventPage,
  EditEventPage,
  UserViewPage,
  EditUserPage,
  MembershipsPage,
} from "../pages";

export const ClientRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-800 w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover">
      <Nav />
      <div className="px-10">
        <div className="min-h-screen flex flex-col ">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/view/:id" element={<UserViewPage />} />
            <Route path="/user/edit/:id" element={<EditUserPage />} />
            <Route path="/main/event/:id" element={<EventPage />} />
            <Route path="/main/event/create" element={<CreateEventPage />} />
            <Route path="/main/event/edit/:id" element={<EditEventPage />} />
            <Route path="/membership" element={<MembershipsPage />} />
            <Route path="/*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
