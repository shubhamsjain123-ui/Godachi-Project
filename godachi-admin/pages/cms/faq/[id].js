import FaqForm from '../../../app/components/Cms/faqs';

import router from "next/router";

const FaqMaster = () => {
    const { id } = router.query;
    return (
      <>
        < FaqForm categoryId={id}/>
      </>
        
    );
}

export default FaqMaster;