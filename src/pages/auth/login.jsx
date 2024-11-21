import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};
const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: `Successfully logged In`,
        });
        navigate("/shop/home");
      } else {
        console.log(data?.payload?.message.startsWith("Not Verifed"));
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
        if (
          data?.payload?.message.startsWith("Not") ||
          data?.payload?.message.startsWith("OTP")
        ) {
          navigate("/auth/verify-email");
          console.log(data?.payload?.token);
          if (data?.payload?.token) {
            sessionStorage.setItem("token", data?.payload?.token);
          }
        }
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your Account
        </h1>
        <p className="mt-2">
          Don't have an Account?{" "}
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Sign up here
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
