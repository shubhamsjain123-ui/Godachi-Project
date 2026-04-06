import Link from "next/link";
const Page = () => {  

   return (
    <section className="404-section section-padding ">
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6   col-sm-8 col-sm-offset-2">
                <div className="section-title section-title-3">
                    <h3 style={{ textAlign: "center" }}>404 NOT FOUND!!</h3>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1" />
                <div className="col-md-10 col-sm-12 col-lg-10 col-lg-offset-1 col-xs-12 col-md-offset-1">
                <div className="empty-text-contant text-center">
                    <img src="images/404.png" />
                    <h4>Looks like this page does not exist.</h4>
                    <Link href={"/"}>
                        <a>
                            <button type="submit" className="subscribe-btn">
                                Take me Home
                            </button>
                        </a>
                    </Link>
                    
                </div>
                </div>
            </div>
        </div>
    </section>
  
   );
};

export default Page;
