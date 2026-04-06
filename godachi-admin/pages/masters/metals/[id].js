import Metal from '../../../app/components/Master/metal';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config/config";

const MetalMaster = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  function getData() {
    axios.get(`${API_URL}/masters/metals/${id}`).then((response) => {
      console.log(response.data)
      var output = Object.entries(response.data).map(([name, value]) => ({
        name,
        value,
      }));

      setData(output);
    });
  }
  // componentDidMount = useEffect
  useEffect(() => {
    getData();
  }, []);
    return (
      <>
        < Metal details={data}/>
      </>
        
    );
}

export default MetalMaster;

