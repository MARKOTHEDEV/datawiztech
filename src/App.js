import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Revenue from "./components/Revenue/Revenue";
import Expenditure from "./components/Expenditure/Expenditure";
import AccountVerification from "./components/AccountVerification/AccountVerification";
import DataSearch from "./components/DataSearch/DataSearch";
import DataPreview from "./components/DataPreview/DataPreview";
import ProfessionalService from "./components/ProfessionalService/ProfessionalService";
import Notification from "./components/Notification/Notification";
import Messages from "./components/Messages/Messages";
import ArticlePreview from "./components/ArticlePreview/ArticlePreview";
import Cart from "./components/Cart/Cart";
import UploadArticle from "./components/Upload/UploadArticle";
import EditArticle from "./components/Upload/EditArticle";
import UploadData from "./components/Upload/UploadData";
import Upload from "./components/Upload/Upload";
import UploadDataTable from "./components/Upload/UploadDataTable";
import Partnership from "./components/Partnership/Partnership";
import NewPartnership from "./components/Partnership/NewPartnership";
import Admin from "./components/Admin/AdminPage/Admin";
import ProtectedRoute from "./useContext/ProtectedRoute";
import Inquiry from "./components/Inquiry/Inquiry";
import ProfileUpdate from "./components/Profile/ProfileUpdate";
import Socials from "./components/Profile/Socials";
import Forbidden from "./components/ErrorPage/Forbidden";
import SubCorperate from "./components/SubCorperate/SubCorperate";
import SubCorp from "./components/SubCorperate/SubCorp";
import Payment from "./components/Payment/Payment";
import EmailLoader from "./components/Header/Email/EmailLoader";
import './index.css'
import TestApp from "./TestApp";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/test" element={<TestApp />} />
        <Route exact path="/search" element={<DataSearch />} />
        <Route exact path="/inquiry" element={<Inquiry />} />
        <Route exact path="/forbidden" element={<Forbidden />} />
        <Route
          exact
          path="/payment/success"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/update"
          element={
            <ProtectedRoute>
              <ProfileUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/notifications"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/revenue"
          element={
            <ProtectedRoute>
              <Revenue />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/expenditure"
          element={
            <ProtectedRoute>
              <Expenditure />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/verify-account"
          element={
            <ProtectedRoute>
              <AccountVerification />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile/update-socials"
          element={
            <ProtectedRoute>
              <Socials />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/upload/edit-article"
          element={
            <ProtectedRoute>
              <EditArticle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/upload/upload-article"
          element={
            <ProtectedRoute>
              <UploadArticle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/upload/upload-data"
          element={
            <ProtectedRoute>
              <UploadData />
            </ProtectedRoute>
          }
        />
        {/* <Route
          exact
          path="/upload/edit-data/table"
          element={
            <ProtectedRoute>
              <UploadDataTable />
            </ProtectedRoute>
          }
        /> */}
        <Route
          exact
          path="/partnership"
          element={
            <ProtectedRoute>
              <Partnership />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/partnership/add-partnership"
          element={
            <ProtectedRoute>
              <NewPartnership />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/sub-corperate/register"
          element={
            <ProtectedRoute>
              <SubCorp />
            </ProtectedRoute>
          }
        />

        <Route exact path="/search/data/result" element={<DataPreview />} />
        <Route
          exact
          path="/search/professional/result/:id"
          element={<ProfessionalService />}
        />
        <Route
          exact
          path="/verify-email/:email/:otp"
          element={<EmailLoader />}
        />
        <Route
          exact
          path="/search/article/result"
          element={<ArticlePreview />}
          // element={<div>
          //   hello world
          // </div>}
        />
        <Route
          exact
          path="/admin/search-history"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/partnership-management"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/new-partnership"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/new-user"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/corporate-management"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/data-management"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/user-management"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/payment-history"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
