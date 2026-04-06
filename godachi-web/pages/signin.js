import { useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import { API_URL } from "../config/config";
import { useSelector } from "react-redux";
import Router from "next/router";
import { GoogleLogin } from '@react-oauth/google';
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../app/components/Header/LoginForm"));
const RegisterForm = dynamic(() => import("../app/components/Header/RegisterForm"));
const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));

const SignInPage = () => {

   const { isAuthenticated } = useSelector((state) => state.login);

   useEffect(() => {
      if (isAuthenticated) {
         return Router.push("/");
      }
   }, [isAuthenticated]);
   const onGoogleLogin = (credentialResponse) =>{
      axios
         .post(`${API_URL}/users/googleLogin`, credentialResponse)
         .then((res) => {
            if (res.data.error) {
               message.error(res.data.messagge);
            } else {
               message.success(res.data.messagge)
               /*form.resetFields();
               message.success(res.data.messagge);
               onSubmitLogin(Data);*/
            }
         })
         .catch((err) => console.log("err", err));
   }
   

   return (
      <>
         <BreadCrumb />
		 
		 
		 <div className="login-register-wrapper section-padding">
  <div className="container">
    <div className="member-area-from-wrap">
      <div className="row">
        {/* Login Content Start */}
        <div className="col-lg-5">
		 <LoginForm routeTo="/"/>
		 
		<hr className="my-4" />
		  
		</div>
        {/* Login Content End */}
        <div className="col-lg-2">
          <img src="assets/img/banner-signup.png" style={{ width: "90%", marginLeft: "10px" }} />
        </div>
        {/* Register Content Start */}
        <div className="col-lg-5">
		  <RegisterForm />
		</div>
        {/* Register Content End */}
      </div>
    </div>
  </div>
</div>


         {/* <div className="grid container-custom gap-10 p-20 grid-cols-12">
            <div className="col-span-12">
               <GoogleLogin
                 onSuccess= {onGoogleLogin}
                 onError={() => {
                   console.log('Login Failed');
                 }}
                 useOneTap
               />
            </div>
            <div className="col-span-6">
               <div className="text-lg font-semibold col-span-12 text-brand-color  mb-5 ">
                  Login{" "}
               </div>
               <LoginForm
                  onSubmitLogin={onSubmitLogin}
                  handleCancelLogin={handleCancelLogin}
               />
            </div>

            <div className="col-span-6">
               <div className="text-lg font-semibold col-span-12 text-brand-color  mb-5 ">
                  Register{" "}
               </div>
               <RegisterForm onSubmitSignup={onSubmitSignup} />
            </div>
         </div> */}
      </>
   );
};

export default SignInPage;
