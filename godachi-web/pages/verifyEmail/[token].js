import router from "next/router";
import { setCookie  } from 'cookies-next';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import { message } from "antd";
import axios from "axios";
import { useEffect } from "react";
const verifyEmail = () => {
    let navigate = useRouter(); 
    const { token } = router.query;
    const { isAuthenticated } = useSelector((state) => state.login);
    const verifyEmailApi = () => {
      axios
         .post(`${API_URL}/users/verifyEmail`, {token})
         .then((res) => {
            if (res.data.error) {
               message.error(res.data.messagge);
            } else {
               message.success("Email successfully verified");
            }

            if(isAuthenticated)
              navigate.push("/profile/profile");
            else
              navigate.push("/signin");
         })
         .catch((err) => {
            console.log("err", err);
            message.error(err);
            if(isAuthenticated)
              navigate.push("/profile/profile");
            else
              navigate.push("/signin");
         });
   };
   useEffect(()=>{
    verifyEmailApi()
   },[])
    return (
      <>
      </>
        
    );
}

export default verifyEmail;