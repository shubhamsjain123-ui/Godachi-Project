import Stats from '../../../app/components/HomePage/stats';
import router from "next/router";
const StatsMaster = () => {
  const { device } = router.query;
    return (
      <>
        <Stats section="stats" device={device}/>
      </>
        
    );
}

export default StatsMaster;