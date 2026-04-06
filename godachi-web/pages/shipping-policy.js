import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));

const Page = () => {  

  const { settings } = useSelector(({ settings }) => settings);
  return (
      <>
         <BreadCrumb />
         <>
  {/* privacy policy content start */}
  <section className="policy-section section-padding">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="policy-list">
            <div dangerouslySetInnerHTML={{
                __html:settings.shipping_policy
            }} />
           {/*  <h3 className="policy-title">Shipping Policy </h3>
            <p>
              Godachi provides free delivery/shipping of all items within India.
              Our delivery duration depends on the product selected, Locations
              and the shipping address. Customer needs to enter the correct
              details of Consignee / Recipient Name (as stated in their photo
              identification issued by the Government of India) with complete
              Address, nearby landmark, pin code, e mail, and contact numbers
              for hassle free delivery. The order shall be dispatch through any
              of the courier partners or their associates depending upon their
              serviceability in the shipping address. Orders can be delivered
              only to Consignee / Recipient’s Residential or Work Location. The
              delivery of the orders cannot be done at any public places like
              Mall, Hotel, Restaurant, on street etc. Our courier agent will
              make 2 more attempts to deliver the product in the absence of the
              recipient not available at the address during his first visit. In
              case the recipient is not reachable / available after these
              attempts, the product will be returned to our facility. Any kind
              of discrepancy in the details of the receiver will result in
              non-delivery of product. Each order may be shipped only to a
              single destination address specified at the time of payment for
              that order. If you wish to ship products to different addresses,
              you shall need to place multiple orders.
              <br />
              <br />
              All our jewellery &amp; Gift products are specially packaged in
              travel-safe, tamper-proof packing and utmost care is taken at
              every stage to ensure that the product reaches your hands in
              perfect condition.
              <br />
              <br />
              To make sure that the delivery is safe and secured, the courier
              agent will note down details of the recipient's identity proof.
              During this process, the receiver is expected to cooperate with
              the agent by providing with original copies of any of the identity
              proof for verification and OTP received on registered mobile
              number.
              <br />
              • Aadhaar Card
              <br />
              • Passport
              <br />
              • Driving License
              <br />
              • Voters ID
              <br />
              <br />
              Shipping of the order from www.godachi.com is very safe, secure
              and hassle free. All goods may be fully insured as transit
              Insurance until they reach you, so your purchase is safe. A
              tentative delivery time will be given along with the formal order
              confirmation email as soon as your order is ready for dispatch.
              Once your order has been shipped, you will receive an e-mail or
              SMS containing your tracking number and a link to the website's
              order-tracking page to monitor the delivery status.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* privacy policy content end */}
</>

      </>
   );
};

export default Page;
