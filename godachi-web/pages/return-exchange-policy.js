import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));

const Page = () => {  
    
   const { settings } = useSelector(({ settings }) => settings);
   return (
      <>
         <BreadCrumb />
          {/* privacy policy content start */}
          <section className="policy-section section-padding">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="policy-list">
                    <div dangerouslySetInnerHTML={{
                       __html:settings.return_policy
                    }} />
                    
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* privacy policy content end */}

      </>
   );
};

export default Page;
