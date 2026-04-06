import dynamic from "next/dynamic";

const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));

const Page = () => {  

   return (
      <>
         <BreadCrumb />
      <section className="policy-section section-padding">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="policy-list">
          <h3 className="policy-title">Privacy Policy</h3>
          <p>
            We value the trust you place in{" "}
            <a href="http://www.godachi.com">godachi.com</a>. That's why we
            insist upon the highest standards for secure transactions and
            customer information privacy. We require Personally Identifiable
            Information to understand your needs, deliver your order and provide
            you with a better service. We keep your personal data in accordance
            with confidentiality requirements and without infringement of your
            privacy. We use the order Information provided by users generally to
            fulfill any orders placed through the Site or apps (including
            processing your payment information, Correct address, E mail, mobile
            number for shipping, and providing you with invoices and/or order
            confirmations and future updates about offers, new arrivals along
            with other product information)
          </p>
          <p>
            To synchronize your wish list and shopping cart already created by
            you on the godachi website or mobile apps. We also use your contact
            information to send you offers and recommendations based on your
            previous orders, your browsing history and your interests. To
            confirm and track the respective orders, prevent against fraud or
            abuse, improve our web site and provide better user experience.
          </p>
          <p>
            We may periodically send promotional emails about new products,
            special offers or other information which we think you may find
            interesting using the email address which you have provided.
          </p>
          <p>
            The Customer agrees, acknowledges, confirms and undertakes that the
            Registration Data, information/data provided or uploaded onto the
            Website by the Customer: <br />
            (a) shall not be false, inaccurate, misleading or incomplete or{" "}
            <br />
            (b) shall not be fraudulent or involve the use of counterfeit or
            stolen Credit Cards or <br />
            (c) shall not infringe any third party's intellectual property,
            trade secret or other proprietary rights or rights of publicity or
            privacy or <br />
            (d) shall not be defamatory, libelous, unlawfully threatening or
            unlawfully harassing or <br />
            (e) shall not contain any viruses or computer programming routines
            or executable files that may damage, detrimentally interfere with,
            surreptitiously intercept or expropriate any system, data or
            personal information of any person whatsoever or
            <br />
            (f) shall not create liability for Seller or cause Seller to lose
            (in whole or in part) the services of Seller's ISPs or other service
            providers/suppliers. If the Customer contravenes the foregoing or
            the Seller has reasonable grounds to suspect that the Customer has
            contravened the foregoing, then we can indefinitely deny or
            terminate Customer's access to the Website or app and to refuse to
            honor the Customer's Order(s).
          </p>
          <p>
            When you provide payment data to make a purchase, we will share
            payment data with payment gateway, banks and other entities that
            process payment transactions or provide other financial services,
            and for fraud prevention and credit risk reduction. In addition, we
            share personal data among our controlled affiliates and
            subsidiaries. We also share personal data with vendors or agents,
            logistics &amp; courier service agencies working on our behalf for
            the purposes described in this statement. For example, companies
            we've hired to provide customer service support or assist in
            protecting and securing our systems and services may need access to
            personal data in order to provide those functions. In such cases,
            these companies must abide by our data privacy and security
            requirements and are not allowed to use personal data they receive
            from us for any other purpose. We may also disclose personal data as
            part of a corporate transaction such as a merger, acquisition, sale
            of assets or any funding &amp; investments, website ranking,
            marketing analytics for better performance &amp; improvement of
            overall functionality of website and apps.
          </p>
          <p>
            The system will be automatically collect certain information on
            visiting godachi site about your device, web browser, IP address,
            time zone, and some of the cookies that are installed on your
            device, information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. The
            automatically-collected information to help us screen for potential
            risk and fraud and to improve and optimize our Site and targeted
            advertisements or marketing communications. The traffic log cookies
            can be used for statistical analysis purposes. You can choose to
            accept or decline cookies. Most web browsers automatically accept
            cookies, but you can usually modify your browser setting to decline
            cookies if you prefer. The security of your personal data is of
            great importance to us. We have put in place reasonable physical and
            technical measures to safeguard the information we collect in
            connection with the Services. However, please note that although we
            take reasonable steps to protect your information, no
            Application/website, Internet transmission, computer system or
            wireless connection is completely secure. We may update this Privacy
            Policy at any time to reflect changes in our practices and service
            offerings as per requirement of the website and apps{" "}
            <a href="http://www.godachi.com">www.godachi.com.</a>
          </p>
        </div>
        {/* policy list end */}
      </div>
    </div>
  </div>
</section>
      </>
   );
};

export default Page;
