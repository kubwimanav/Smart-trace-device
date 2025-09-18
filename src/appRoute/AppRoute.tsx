import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../App.css";
import Layout from "../Landingpage/Layout";
import About from "../Landingpage/AboutUs";
import LostItem from "../Landingpage/LostItem";
import FoundItem from "../Landingpage/FoundItem";
import ReportFoundItem from "../Landingpage/ReportFoundItem";
import ReportLostItem from "../Landingpage/ReportLostItem";
import ScrollToTop from "../Landingpage/ScrollTop";
import UserFoundItem from "../Dashboard/admin/AdminFoundItem";
import ContactMessagesPage from "../Dashboard/admin/ContactMessages";
import UserLostItem from "../Dashboard/admin/AdminLostItem";
import LandingAuth from "../Landingpage/auth";
import AdminDashHome from "../Dashboard/admin/AdminDashHome";
import AdminManagement from "../Dashboard/admin/AdminManagement";
import AdminLostItem from "../Dashboard/admin/AdminFoundItem";
import AdminDashLayout from "../Dashboard/admin/AdminDashLayout";
import UserDashLayout from "../Dashboard/userdash/UserDashLayout";
import UserDashHome from "../Dashboard/userdash/UserDashHome";
import MatchedItem from "../Dashboard/admin/MatchedItem";

const AppRaute = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/LandingAuth" element={<LandingAuth />} />

        {/* admin */}

        <Route path="/admin" element={<AdminDashLayout />}>
          <Route index element={<AdminDashHome />} />
          <Route path="admin" element={<AdminDashHome />} />
          <Route path="users" element={<AdminManagement />} />
          <Route path="adminfounditem" element={<AdminLostItem />} />
          <Route path="adminlostitem" element={<AdminLostItem />} />
          <Route path="message" element={<ContactMessagesPage />} />
          <Route path="match" element={<MatchedItem />} />
        </Route>

        {/* userdash */}
        <Route path="/userDash" element={<UserDashLayout />}>
          <Route index element={<UserDashHome />} />
          <Route path="userdash" element={<UserDashHome />} />
          <Route path="userfounditem" element={<UserFoundItem />} />
          <Route path="userlostitem" element={<UserLostItem />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<About />} />
          <Route path="home" element={<About />} />
          <Route path="founditem" element={<FoundItem />} />
          <Route path="lostitem" element={<LostItem />} />
          <Route path="reportfounditem" element={<ReportFoundItem />} />
          <Route path="reportlostitem" element={<ReportLostItem />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
};
export default AppRaute;
