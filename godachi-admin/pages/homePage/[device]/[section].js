import Banner from '../../../app/components/HomePage/banner';
import router from "next/router";
const BannerMaster = () => {
    const { section, device } = router.query;
    return (
      <>
        <Banner section={section} device={device}/>
      </>
        
    );
}

export default BannerMaster;