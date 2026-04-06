import router from "next/router";
import { setCookie  } from 'cookies-next';
import { useRouter } from 'next/router';
const Refer = ({ getData = [] }) => {
    let navigate = useRouter(); 
    const { id } = router.query;
    setCookie('referralUserCode', id);
    navigate.push("/signin");
  return (
    <>
    </>
      
  );
}

export default Refer;