import Testimonial from '../../../app/components/HomePage/testimonial';
import router from "next/router";
const TestimonialMaster = () => {
  const { device } = router.query;
    return (
      <>
        <Testimonial section="testimonial" device={device} />
      </>
        
    );
}

export default TestimonialMaster;