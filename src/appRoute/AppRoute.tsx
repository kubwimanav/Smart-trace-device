import { Route, Routes } from "react-router-dom";
import "../App.css";
import Layout from "../Landingpage/Layout";
import About from "../Landingpage/AboutUs";
import LostItem from "../Landingpage/LostItem";
import ReportFoundItem from "../Landingpage/ReportFoundItem";
import ReportLostItem from "../Landingpage/ReportLostItem";
import ScrollToTop from "../Landingpage/ScrollTop";
import ContactMessagesPage from "../Dashboard/admin/ContactMessages";
import LandingAuth from "../Landingpage/auth";
import AdminDashHome from "../Dashboard/admin/AdminDashHome";
import AdminManagement from "../Dashboard/admin/AdminManagement";
import AdminDashLayout from "../Dashboard/admin/AdminDashLayout";
import UserDashLayout from "../Dashboard/userdash/UserDashLayout";
import UserDashHome from "../Dashboard/userdash/UserDashHome";
import MatchedItem from "../Dashboard/admin/MatchedItem";
import Login from "../Landingpage/login";
import Register from "../Landingpage/Register";
import OtpPage from "../Landingpage/otp";
import AdminFoundItem from "../Dashboard/admin/AdminFoundItem";
import FoundItem from "../Landingpage/FoundItem";
import AdminLostItems from "../Dashboard/admin/AdminLostItems";
import UserFoundItemById from "../Dashboard/userdash/UserFoundItemById";
import AdminReport from "../Dashboard/admin/Report";
import UserLostItemById from "../Dashboard/userdash/UserLostItemById";
import LostItemDetail from "../Landingpage/LostItemDetail";

const AppRaute = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/LandingAuth" element={<LandingAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpPage />} />


        {/* admin */}

        <Route path="/admin" element={<AdminDashLayout />}>
          <Route index element={<AdminDashHome />} />
          <Route path="admin" element={<AdminDashHome />} />
          <Route path="users" element={<AdminManagement />} />
          <Route path="adminfounditem" element={<AdminFoundItem />} />
          <Route path="message" element={<ContactMessagesPage />} />
          <Route path="match" element={<MatchedItem />} />
          <Route path="adminlostitem" element={<AdminLostItems />} />
          <Route path="report" element={<AdminReport />} />
        </Route>

        {/* userdash */}
        <Route path="/userDash" element={<UserDashLayout />}>
          <Route index element={<UserDashHome />} />
          <Route path="userdash" element={<UserDashHome />} />
          <Route path="userfounditem" element={<UserFoundItemById />} />
          <Route path="userlostitem" element={<UserLostItemById />} />
          <Route path="report" element={<AdminReport />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<About />} />
          <Route path="home" element={<About />} />
          <Route path="founditem" element={<FoundItem />} />
          <Route path="lostitem" element={<LostItem />} />
          <Route path="reportfounditem" element={<ReportFoundItem />} />
          <Route path="reportlostitem" element={<ReportLostItem />} />
           <Route path="lost-items/:id" element={<LostItemDetail />} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRaute;
