import "./App.css";
import "./index.css";
import "react-responsive-modal/styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "boxicons";
import Login from "./pages/authentication/login";
import ForgotPassword from "./pages/authentication/forgotPassword";
import ValidateCode from "./pages/authentication/validateCode";
import ResetPassword from "./pages/authentication/resetPassword";
import Register from "./pages/authentication/register";
import AuthenticationLayout from "./components/layouts/authenticationLayout";
import RegisterStepPoints from "./components/authentication/registerStepPoints";
import VerifyEmail from "./components/authentication/register/verifyEmail";
import RegisterSuccess from "./pages/authentication/registerSuccess";
import RegisterSteps from "./pages/authentication/registerSteps";
import Home from "./pages/home";
import { useEffect, useState } from "react";
import DashboardLayout from "./components/layouts/layout";
import PersonalSetting from "./pages/settings/personal-setting";
import GlobalCompanySetting from "./pages/settings/global-setting";
import CreateMember from "./components/member/createMember";
import MessagePage from "./pages/message";
import MessageSettings from "./pages/message/settings";
import ScrollToTop from "./helpers/ScrollToTop";
import Reporting from "./pages/reporting";
import Contacts from "./pages/contacts";
import Properties from "./pages/properties";
import Deals from "./pages/deals";
import Documents from "./pages/documents";
import ProcessBoards from "./pages/process-boards";
import ContactSettings from "./pages/contacts/settings";
import ContactSettingDetails from "./pages/contacts/contactDetails";

const IsAuthenticated = ({ children }) => {
  const user = localStorage.getItem("token");
  const stepData = localStorage.getItem("step");
  console.log(stepData, "stepData");
  if (stepData) {
    return <Navigate to={"/register/steps"} />;
  } else if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

const IsStepsAuthenticated = ({ children }) => {
  const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

const IsNotAuthenticated = ({ children }) => {
  const user = localStorage.getItem("token");
  if (user) {
    return <Navigate to={"/"} />;
  }
  return children;
};

function App() {
  const [step, setStep] = useState(1);
  const checkStep = (step) => {
    console.log(step, "step::::::::::");

    setStep(step);
    window.scrollTo(0, 0);
  };
  console.log(step);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <IsNotAuthenticated>
              <AuthenticationLayout>
                <Login />
              </AuthenticationLayout>
            </IsNotAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/forgot-password"
          element={
            <AuthenticationLayout>
              <ForgotPassword />
            </AuthenticationLayout>
          }
        ></Route>
        <Route
          exact
          path="/validate-code"
          element={
            <AuthenticationLayout>
              <ValidateCode />
            </AuthenticationLayout>
          }
        ></Route>
        <Route
          exact
          path="/reset-password"
          element={
            <AuthenticationLayout>
              <ResetPassword />
            </AuthenticationLayout>
          }
        ></Route>
        <Route
          exact
          path="/register"
          element={
            <IsNotAuthenticated>
              <AuthenticationLayout registerListPoints={<RegisterStepPoints />}>
                <Register />
              </AuthenticationLayout>
            </IsNotAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/verify-email/:token"
          element={
            <AuthenticationLayout
              bgWhite="bg-white"
              rightPortionHide="rightPortionHide"
            >
              <VerifyEmail />
            </AuthenticationLayout>
          }
        ></Route>
        <Route
          exact
          path="/register-success"
          element={
            <IsNotAuthenticated>
              <AuthenticationLayout>
                <RegisterSuccess />
              </AuthenticationLayout>
            </IsNotAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/register/steps"
          element={
            <IsStepsAuthenticated>
              <AuthenticationLayout
                step={step}
                registerListPoints={<RegisterStepPoints />}
              >
                <RegisterSteps
                  setStep={setStep}
                  step={step}
                  checkStep={checkStep}
                />
              </AuthenticationLayout>
            </IsStepsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <Home />{" "}
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/settings/personal-setting"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <PersonalSetting />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/settings/global-company-setting"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <GlobalCompanySetting />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/register/member/:token"
          element={
            <AuthenticationLayout>
              <CreateMember />
            </AuthenticationLayout>
          }
        ></Route>
        <Route
          exact
          path="/message"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <MessagePage />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/message-settings"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <MessageSettings />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/reporting"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <Reporting />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/contacts"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <Contacts />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/contact-settings"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <ContactSettings />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/properties"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <Properties />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/deals"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <Deals />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/documents"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <Documents />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
        <Route
          exact
          path="/process-boards"
          element={
            <IsAuthenticated>
              <DashboardLayout>
                <ProcessBoards />
              </DashboardLayout>
            </IsAuthenticated>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
