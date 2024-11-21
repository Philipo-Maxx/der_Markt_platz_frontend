import React from "react";
import SignUpForm from "@/components/auth/perano/SignUpForm";

const Register = () => {
  return (
    <div className="w-5/12">
      <div className="w-full flex justify-end">
        <h1 className="font-[600] text-[30px]">Perano Dev</h1>
      </div>
      <div className="h-full w-full flex justify-around items-center">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Register;
