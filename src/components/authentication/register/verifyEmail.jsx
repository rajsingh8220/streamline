import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailApi } from "../../../Api/user";
import VerifyEmailArt from "./../../../assets/images/verify-email.svg";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { login } from "../../../pages/redux/user";

const VerifyEmail = ({ setStep }) => {
  toast.options = { preventDuplicates: true };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const res = await verifyEmailApi(token);
      console.log(res, "res");

      if (res && res.data.code === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          localStorage.setItem("token", res.data.jwtToken);
          localStorage.setItem("step", 1);
          navigate(`/register/steps`);
        }, 500);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center">
      <div className="block w-[60%] m-auto">
        <img src={VerifyEmailArt} alt="verify-email" className="m-auto mb-8" />
        <h1 className="font-Karla tracking-[-.03em] font-bold text-text-dark text-3xl text-center mb-3">
          Please verify your email address
        </h1>
        <p className="font-Karla font-medium text-blueDark tracking-[-.03em] text-2xl text-center">
          Check your email inbox for a verification email.
        </p>
        <p className="font-Karla font-medium text-blueDark tracking-[-.03em] text-2xl text-center">
          Didn’t receive an email? Resend email
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
