import React, { useEffect, useState } from "react";
import "boxicons";
import CreateAccountStep1 from "../../components/authentication/register/step1";
import CreateAccountStep2 from "../../components/authentication/register/step2";
import CreateAccountStep3 from "../../components/authentication/register/step3";
import CreateAccountStep4 from "../../components/authentication/register/step4";
import { useNavigate, useParams } from "react-router-dom";
import { userlistApi } from "../../Api/user";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
import toast from "toastr";

const RegisterSteps = ({ checkStep, setStep, step }) => {
  const steps = localStorage.getItem("step");
  const [mlsAccountView, setmlsAccountView] = useState(false);
  console.log(mlsAccountView, "mlsAccountView");
  const [userData, setUserData] = useState([]);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(step, ":stepsdsssddddd111");

  useEffect(() => {
    if (steps) checkStep(parseInt(steps));
    else checkStep(parseInt(step));
  }, [steps]);
  console.log(step, "sdsdds", token);
  useEffect(() => {
    console.log(step, ":stepsdsssddddd");
  }, [step]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const res = await userlistApi();
    if (res?.data?.code === 200) {
      setUserData(res.data.data);
      checkStep(parseInt(res.data.data.stepCompleted));
      if (res.data?.data?.mls_list.length > 0) setmlsAccountView(true);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
  };

  console.log(userData, "userData");
  return (
    <>
      {step === 1 ? (
        <CreateAccountStep1 setStep={setStep} token={token} />
      ) : step === 2 ? (
        <CreateAccountStep2 setStep={setStep} userData={userData} />
      ) : step === 3 ? (
        <CreateAccountStep3
          setStep={setStep}
          userData={userData}
          setmlsAccountView={setmlsAccountView}
        />
      ) : step === 4 ? (
        <CreateAccountStep4
          setStep={setStep}
          userData={userData}
          getUserDetails={getUserDetails}
          mlsAccountView={mlsAccountView}
          setmlsAccountView={setmlsAccountView}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default RegisterSteps;
