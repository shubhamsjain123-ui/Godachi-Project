import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));

const Page = () => {  
    
   const { settings } = useSelector(({ settings }) => settings);
   return (
      <>
         <BreadCrumb />

         <section className="policy-section section-padding">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="policy-list">
            <h3 className="policy-title">Terms &amp; Conditions </h3>
            <p>
              INTRODUCTION : This website godachi.com along with mobile apps is
              operated as online shopping website or apps for Gems &amp;
              Jewellery, Gifts &amp; accessories, throughout the site, the terms
              “we”, “us” and “our” refer to godachi.com, including all
              information, tools and services available from this site to you,
              the user, conditioned upon your acceptance of all terms,
              conditions, policies and notices stated here.
            </p>
          </div>
          <div className="policy-list">
            <h3 className="policy-title">Eligibility Criteria</h3>
            <p>
              If you are below 18 years of age, you are prohibited to
              use/purchase/contract from or with this website. Persons who are
              incompetent to contract within the meaning of the Indian Contract
              Act, 1872 are not eligible to use this website.
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Product Photography </h3>
            <p>
              We have made every effort to display as accurately as possible the
              colours, shape of our products that appear on the website.
              However, as the actual colours you see will depend on your
              monitor, we cannot guarantee that your monitor's display of any
              colour will accurately reflect the colour of the product on
              delivery. Since the website management is sourcing different
              products from different manufacturers, suppliers so there is a
              possibility that any products may have some variations in terms of
              color, shape, size, weight, quality in display and the actual
              product received.
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">
              Errors, Inaccuracies And Omissions{" "}
            </h3>
            <p>
              The material on this site is provided for general information only
              and should not be relied upon or used as the sole basis for making
              decisions without consulting primary, more accurate, more complete
              or more timely sources of information. Occasionally there may be
              information on our site or in the Service that contains
              typographical errors, inaccuracies or omissions that may relate to
              product descriptions, pricing, promotions, offers, product
              shipping charges, transit times and availability. We reserve the
              right to correct any errors, inaccuracies or omissions, and to
              change or update information or cancel orders if any information
              in the Service or on any related website is inaccurate at any time
              without prior notice (including after you have submitted your
              order). Any reliance on the material on this site is at your own
              risk. We are not responsible if information made available on this
              site is not accurate, complete or current. The products may have
              some variations in weight, color, size, aesthetics due to
              manufacturers end. The website &amp; mobile apps are in principal
              made in English language however in case of translation through
              language convertor, there may be some ambiguity in words or
              sentences shall be ignore and cross check by English version. In
              case of any clarification please communicate us through e mail.
            </p>
            <p>
              Neither we nor any third parties provide any warranty or guarantee
              as to the accuracy, appropriateness, performance, completeness or
              suitability of the information and materials found or offered on
              this website and app for any particular purpose. You acknowledge
              that such information and materials may contain inaccuracy or
              errors and we expressly exclude liability for any such
              inaccuracies or errors to the fullest extent permitted by law.
            </p>
            <p>
              This site may contain certain historical information necessarily,
              is not current and is provided for your reference only. We reserve
              the right to modify the contents of this site at any time, but we
              have no obligation to update any information on our site. You
              agree that it is your responsibility to monitor changes to our
              site.
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Third Party website Links </h3>
            <p>
              Third-party links on this site may direct you to third-party
              websites that are not affiliated with us, over which we neither
              monitor nor have any control. You acknowledge and agree that we
              provide access to such tools ”as is” and “as available” without
              any warranties, representations or conditions of any kind and
              without any endorsement. We shall have no liability whatsoever
              arising from or relating to your use of optional third-party
              tools, payment gateway, sms, courier service providers whatsoever.
              Any use by you of optional tools offered through the site is
              entirely at your own risk and discretion and you should ensure
              that you are familiar with and approve of the terms on which tools
              are provided by the relevant third-party provider(s).
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Enquiry</h3>
            <p>
              If you have any queries about these terms and conditions or any
              complaints or suggestions regarding our website or apps, please
              feel free to write to{" "}
              <a href="mailto:support@godachi.com">support@godachi.com</a>{" "}
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">
              Submissions, Reviews, Feedback, Comments
            </h3>
            <p>
              All the users shall agree that your comments will not violate any
              right of any third-party, including copyright, trademark, privacy,
              personality or other personal or proprietary right. You further
              agree that your comments will not contain unlawful, abusive or
              obscene material, or contain any computer virus or other malware
              that could in any way affect the operation of the Service or any
              related website. You may not use a false e mail address, pretend
              to be someone other than yourself, or otherwise mislead us or
              third-parties as to the origin of any comments. You are solely
              responsible for any comments you make and their accuracy. We take
              no responsibility and assume no liability for any comments posted
              by you or any third-party.
            </p>
            <p>
              All reviews, comments, feedback, postcards, suggestions, ideas,
              testimonials, ranking stars and other submissions disclosed,
              submitted or offered in connection with your use of this website
              or apps will be and remain the property of godachi. Such
              disclosure, submission or offer of any comments shall constitute
              an assignment to godachi of all worldwide rights, titles and
              interests in all copyrights and other intellectual properties in
              the comments.
            </p>
            <p>
              Thus, Godachi owns exclusively all such rights, titles and
              interests and shall not be limited in any way in its use,
              commercial or otherwise of any comments. godachi will be entitled
              to use, reproduce, disclose, modify, adapt, create derivative
              works from, publish, display and distribute any comments you
              submit for any purpose whatsoever, without restriction and without
              compensating you in any way. Godachi will be under no obligation
              <br />
              a) To maintain any comments in confidence <br />
              b) To pay you any compensation for any comments <br />
              c) To respond to any comments
            </p>
            <p>
              Godachi does not regularly review posted comments, but does
              reserve the right (but not the obligation) to monitor and edit or
              remove any comments submitted to this website. You grant Godachi
              the right to use the name that you submit in connection with any
              comments. You agree not to use a false email address, impersonate
              any person or entity, or otherwise mislead as to the origin of any
              comments you submit. You are and shall remain solely responsible
              for the content of any comments you make and you further agree to
              keep indemnified Godachi and its affiliates for all claims
              resulting from any comments submitted by you. Godachi and its
              affiliates are not responsible nor assume any liability for any
              comments submitted by you or any third party.
            </p>
            <p>
              If you would like to provide feedback about godachi.com web site,
              or recommend a way we can improve the buying experience, please
              write to{" "}
              <a href="mailto:support@godachi.com">support@godachi.com</a>
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Sale of Product rights</h3>
            <p>
              We reserve the right, but are not obligated, to limit the sales of
              our products or Services to any person, geographic region or
              jurisdiction. We may exercise this right on a case-by-case basis.
              We reserve the right to limit the quantities of any products or
              services that we offer. All descriptions of products or product
              pricing are subject to change at any time without notice, at the
              sole discretion of us. We reserve the right to discontinue any
              product at any time.{" "}
            </p>
            <p>
              We reserve the right to refuse any order you place with us. We
              may, in our sole discretion, limit or cancel quantities purchased
              per person, per household or per order. These restrictions may
              include orders placed by or under the same customer account, the
              same credit card, and/or orders that use the same billing and/or
              shipping address. In the event that we make a change to or cancel
              an order, we may attempt to notify you by contacting the e mail
              and/or billing address/phone number provided at the time the order
              was made. We reserve the right to limit or prohibit orders that,
              in our sole judgment, appear to be placed by dealers, resellers or
              distributors.
            </p>
            <p>
              You agree to provide current, complete and accurate purchase,
              address and account information for all purchases made at our
              platform. You agree to promptly update your account and other
              information, including your mobile number and email address, so
              that we can complete your transactions and contact you as needed.
            </p>
          </div>
          {/* policy list end */}
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">
              Sales and Promotion, Offers &amp; Discounts
            </h3>
            <p>
              Free Gift / discount issued during the original sale, will be
              deducted at the time of Exchange / Buyback at Invoice value. None
              of the products can be exchanged for gold / silver coins / bars,
              and gift products.
            </p>
            <p>
              The sales runs till stock lasts. Duration of sale is in the sole
              discretion of Godachi and it reserves the right to extend or
              terminate the sale, without further information at any point of
              time.{" "}
            </p>
            <p>
              Any additional facilities provided by the company to winners and
              selectees of any contest is at the company's discretion. Godachi
              reserves the right to change the terms and conditions of contests/
              giveaways without prior intimation. Special offer or discount is
              valid only on select designs and time period on jewellery, Gifts
              &amp; accessories.
            </p>
            <p>
              The Customer agrees and acknowledge that in the Website all
              Product(s) are offered only at the sole discretion of the Seller
              for a restricted time and only for the available supply/till stock
              lasts. Prices on the website are subject to change without any
              prior notice, as the prices are calculated using current prices of
              precious metals, gems &amp; making charges.
            </p>
            <p>
              Any product you buy from our website or app is completely at your
              discretion and you accept that you place the order only after
              thoroughly inquiring about the product and being completely
              acquainted about the product, its features, quality, color, size,
              weight, characteristics, usage etc. Godachi is not liable for any
              kind of damages or losses whatsoever suffered by the customers due
              to the use of the product. This is applicable for both domestic
              and international orders.
            </p>
            <p>
              You further agree and undertake to provide the correct and valid
              credit card details . We will not be liable for any credit card or
              debit card, upi, payment apps or payment gateway fraud. The
              liability for use of a card or net banking fraudulently will be on
              you and the responsibility to 'prove otherwise' shall be
              exclusively on you, your bank and upi or payment gateway.
            </p>
            {/* policy list end */}
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Size</h3>
            <p>
              While we try to ensure that all measurements on our website are
              accurate, errors may occur as each piece is unique. Ring sizing is
              sometimes a challenge to get perfectly right. Please choose your
              ring or Bangle size carefully.{" "}
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Quality </h3>
            <p>
              Our best efforts will be about the sourcing of various jewellery
              &amp; gift items from reputed manufacturers, suppliers or vendors
              who ensure the quality of metals or materials used whereas in
              spite of our best efforts, if any customer has any observation of
              quality, can communicate us by email to have corrective measures.{" "}
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Packaging </h3>
            <p>
              Packaging of the product may vary from the packaging of the
              product displayed in the website depends on the availability of
              packaging materials at the time of dispatch.{" "}
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">International users </h3>
            <p>
              Those who choose to access godachi.com website or app from outside
              India are responsible for compliance with local laws and if to the
              extent local laws are applicable. In case if any Indian states
              prohibit direct sale of merchandise from other states and require
              special documentation to effect such a sale without dual taxation,
              if we receive an order from such states or to be delivered to such
              states under such circumstances we retain the right to accept or
              reject the order.{" "}
            </p>
            <p>
              In case of international credit cards being used for domestic
              orders, the transaction amount will be converted to INR before the
              payment is accepted. Currency conversion charges may apply
              according to your credit card policy will be bear by you. If you
              have made the payment by International card or foreign bank issued
              card then you will be required to send us any government issued
              photo Identity proof of the country of residence as mentioned
              below
              <br />
              a) Passport <br />
              b) Driving license
              <br />
              c) Any other government issued ID proof of the the country of
              residence.
            </p>
            <p>
              Payments for International Orders are accepted through linked
              payment gateway either by your account or by using International
              credit/debit cards only. For orders being shipped outside India,
              the payment will be accepted only in US Dollars. For international
              orders, currency conversion rates will apply according to the
              prevailing exchange rates on the day of placing the order.
            </p>
            <p>
              For shipments being sent outside India, Prices will include all
              the applicable taxes in India and the shipping and handling
              charges.
            </p>
            <p>
              Any other import duties or charges (VAT) levied in the destination
              country of the shipment has to be borne by the customer. These
              Duties or Taxes are to be paid extra as per actual and are subject
              to change. All these rates are subject to changes and to be borne
              by the customer as per actual at the time of delivery.
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">
              Pricing And Payment (Credit cards){" "}
            </h3>
            <p>
              The payment for the product is applicable as mentioned as full
              payment at the time of booking or Cash on Delivery as the case may
              be. The acceptable payment modes are a credit cards, debit cards,
              net banking, wallet, and UPI payments through the integrated
              payment gateway &amp; bank. Our pricing is calculated using
              current precious metal and gem prices to give you the best
              possible value. These prices do change from time to time, owing to
              the fluctuations in prices of precious metal and gem prices, so
              our prices change as well. Prices on godachi.com are subject to
              change without notice. Please expect to be charged the price for
              the merchandise you buy as it is listed on the day of purchase.
            </p>
            <p>
              Sometimes items may be mispriced due to typographical errors or
              otherwise and we will charge the correct price if is lower than
              the stated price. However if the stated price is lower than the
              correct price, the user can decide to pay the difference or we may
              decide to cancel the order without any legal obligation or
              liability.
            </p>
            <p>
              Credit card charges to be deducted over and above the buyback
              deductions, on the overall value as per company policy. For orders
              being shipped within India, the payment can only be accepted in
              INR. Prices will be MRP and CGST/SGST and IGST, as applicable.
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Pan Card T&amp;C </h3>
            <p>
              As per the current guidelines mandated by the Government of India,
              a customer has to provide the Permanent Account Number (PAN) for
              all purchases above INR 2 lakh. For all domestic shipments, if the
              order value exceeds Rs 2 lakhs, the customer will need to enter
              the PAN card number and click on verify Pan card. Only upon PAN
              card verification the order will proceed ahead to the payment
              page. The billing name is supposed to be the same as the PAN card
              else the PAN card will not get verified and the customer will not
              be able to proceed ahead with the order.{" "}
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <div dangerouslySetInnerHTML={{
                __html:settings.return_policy
            }} />
          </div>

          <div className="policy-list">
            <div dangerouslySetInnerHTML={{
                __html:settings.shipping_policy
            }} />
          </div>
          {/* policy list end */}
          {/* <div className="policy-list">
            <h3 className="policy-title">Shipping Policy </h3>
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
              you shall need to place multiple orders.{" "}
            </p>
            <p>
              All our jewellery &amp; Gift products are specially packaged in
              travel-safe, tamper-proof packing and utmost care is taken at
              every stage to ensure that the product reaches your hands in
              perfect condition.{" "}
            </p>
            <p>
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
              <br />• Voters ID
            </p>
            <p>
              Shipping of the order from www.godachi.com is very safe, secure
              and hassle free. All goods may be fully insured as transit
              Insurance until they reach you, so your purchase is safe. A
              tentative delivery time will be given along with the formal order
              confirmation email as soon as your order is ready for dispatch.
              Once your order has been shipped, you will receive an e-mail or
              SMS containing your tracking number and a link to the website's
              order-tracking page to monitor the delivery status.
            </p>
          </div> */}
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Site Security </h3>
            <p>
              You are prohibited from violating or attempting to violate the
              security of this website, including, without limitation:
              <br />
              a) Accessing data not intended for you or logging onto a server or
              an account which you are not authorized to access.
              <br />
              b) Attempting to probe, scan or test the vulnerability of a system
              or network or to breach security or authentication measures
              without proper authorization.
              <br />
              c) Attempting to interfere with service to any other user, host or
              network, including without limitation via means of submitting a
              virus to the site, overloading, flooding, spamming, mail-bombing
              or crashing.
              <br />
              d) Sending unsolicited email, including promotions and or
              advertising of products or services;
              <br />
              e) Forging any TCP / IP packet header or any part of the header
              information in any email or newsgroup, posting violations of
              system or network security may result in civil or criminal
              liability.
            </p>
            <p>
              Godachi will investigate occurrences that may involve such
              violations and may involve, and cooperate with law enforcement
              authorities in prosecuting users who are involved in such
              violations. You agree not to use any device, software or routine
              to interfere or attempt to interfere with the proper working of
              this site or any activity being conducted on this site. You agree,
              further, not to use or attempt to use any engine, software, tool,
              agent or other device or mechanism (including, without limitation,
              browsers, spiders, robots, avatars or intelligent agents) to
              navigate or search this site other than the search engine and
              search agents available on this site and other than generally
              available third party web browsers (e.g. Microsoft Explorer,
              Google Chrome, Mozilla Firefox).
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Use of website content </h3>
            <p>
              By visiting or using this website, app or service, you acknowledge
              that you have read, understood, and agree to be bound by, these
              Terms &amp; Conditions. You also agree to comply with all
              applicable laws and regulations, including Privacy Policy,
              shipping policy, cancellation policy, Copyright and Trademark
              laws. If you do not agree to these terms, please do not use
              godachi.com web site or apps.
            </p>
            <p>
              Your use of any information or materials on this website, app is
              entirely at your own risk, for which we shall not be liable. It
              shall be your own responsibility to ensure that any products,
              services or information available through this website meet your
              specific requirements.
            </p>
            <p>
              You are not allowed to create a link to this website from another
              website or document without our prior written permission.
              Unauthorized use of this website may give rise to a claim for
              damages and/or be a criminal offense.
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Changes to Terms &amp; conditions</h3>
            <p>
              You can review the most current version of the Terms &amp;
              conditions at any time. We reserve the right, at our sole
              discretion, to update, change or replace any part of these Terms
              &amp; conditions by posting updates and changes to our website and
              app. It is your responsibility to check our website periodically
              for changes. Your continued use of or access to our website or the
              Service following the posting of any changes to these Terms &amp;
              conditions constitutes acceptance of those changes. Godachi
              reserves the right at any time to modify the terms and conditions
              of this user agreement without any prior notification to you.{" "}
            </p>
          </div>
          {/* policy list end */}
          <div className="policy-list">
            <h3 className="policy-title">Prohibited Uses </h3>
            <p>
              In addition to other prohibitions as set forth in the Terms of
              Service, you are prohibited from using the site or its content:{" "}
              <br />
              (a) for any unlawful purpose; <br />
              (b) to solicit others to perform or participate in any unlawful
              acts; <br />
              (c) to violate any international, federal, provincial or state
              regulations, rules, laws, or local ordinances; <br />
              (d) to infringe upon or violate our intellectual property rights
              or the intellectual property rights of others; <br />
              (e) to harass, abuse, insult, harm, defame, slander, disparage,
              intimidate, or discriminate based on gender, sexual orientation,
              religion, ethnicity, race, age, national origin, or disability;{" "}
              <br />
              (f) to submit false or misleading information; <br />
              (g) to upload or transmit viruses or any other type of malicious
              code that will or may be used in any way that will affect the
              functionality or operation of the Service or of any related
              website, other websites, or the Internet; <br />
              (h) to collect or track the personal information of others; <br />
              (i) to spam, phish, pharm, pretext, spider, crawl, or scrape;{" "}
              <br />
              (j) for any obscene or immoral purpose; or <br />
              (k) to interfere with or circumvent the security features of the
              Service or any related website, other websites, or the Internet.
              We reserve the right to terminate your use of the Service or any
              related website for violating any of the prohibited uses.
            </p>
          </div>
          <div className="policy-list">
            <h3 className="policy-title">Trademark &amp; Copyright</h3>
            <p>
              The trademarks, names, logos and service marks (collectively
              "trademarks") displayed on this website are registered. Nothing
              contained on this website should be construed as granting any
              license or right to use any trademark, text, images, video,
              graphics or any sort of content without the prior written
              permission of godachi.
            </p>
            <p>
              Godachi reserves all intellectual property rights in all text,
              programs, products, processes, technology, content and other
              materials, which appear on this Website &amp; app. Access to this
              Website does not authorize anyone to use any name, logo or mark in
              any manner. All materials, including images, text, illustrations,
              designs, icons, photographs, programs, music clips or downloads,
              video clips and written and other materials that are part of this
              Website and app (collectively, the 'Contents') are intended solely
              for personal, non-commercial use. You will not reproduce (except
              as noted above), publish, transmit, distribute, display, modify,
              create derivative works from, sell or participate in any sale of
              or exploit in any way, in whole or in part, any of the Contents of
              the Website or any related software.{" "}
            </p>
            <p>
              Godachi reserves the right to change these terms and conditions
              from time to time without any obligation to inform you and it is
              your responsibility to look through them as often as possible. All
              rights including copyright, in this website, are owned by{" "}
              <b>Godachi Private Limited</b>. Any use of this website or its
              contents, including copying or storing it in whole or part without
              the permission of <b>Godachi Private Limited</b> is strictly
              prohibited.
            </p>
          </div>
          <div className="policy-list">
            <h3 className="policy-title">Invitation to offer </h3>
            <p>
              All products and the information displayed on www.godachi.com
              constitute an invitation to offer. Your order for purchase
              constitutes your offer which shall be subject to the terms and
              conditions as listed herein. We reserve the right to accept or
              reject your offer in part or in full. Our acceptance of your order
              will take place upon the dispatch of the product(s) ordered.
              Dispatch of product(s) ordered, may or may not happen at the same
              time. In such a scenario, that portion of the order which has been
              dispatched will be deemed to have been accepted by us and the
              balance would continue to be an offer to us and we reserve the
              right to either accept or reject the balance offer.
            </p>
            <p>
              We have made every effort to display the colors, shapes, design,
              sizes of our products that appear on our website as accurately as
              possible. However, as the actual configurations you see will
              depend on your monitor. We cannot guarantee that your monitor's
              display of any product will accurately reflect the product on
              delivery. Packaging of the product may vary from that displayed on
              the website.
            </p>
          </div>
          <div className="policy-list">
            <h3 className="policy-title">
              {" "}
              Limitation of Liability &amp; Damages{" "}
            </h3>
            <p>
              The website and app owner shall not be responsible for and
              disclaims all liability for any loss, damage (whether direct,
              indirect or consequential), personal injury or expense of any
              nature whatsoever which may be suffered by you or any third party
              (including your company), as a result of or which may be
              attributable, directly or indirectly, to your access and use of
              the website or app, any information contained on the website, In
              particular, neither the website owner nor any third party or data
              or content provider shall be liable in any way to you or to any
              other person, firm or corporation whatsoever for any loss,
              liability, damage (whether direct or consequential), arising from
              any delays, inaccuracies, errors in, or omission of any share
              price information or the transmission thereof, or for any actions
              taken in reliance thereon or occasioned thereby or by reason of
              non-performance or interruption, or termination thereof.
            </p>
          </div>
          <div className="policy-list">
            <h3 className="policy-title">Indemnification </h3>
            <p>
              You agree to indemnify, defend and hold harmless Gudachi and our
              parent, subsidiaries, affiliates, partners, officers, directors,
              agents, contractors, licensors, service providers, subcontractors,
              suppliers, interns and employees, harmless from any claim or
              demand, including reasonable attorneys’ fees, made by any
              third-party due to or arising out of your breach of these Terms of
              Service or the documents they incorporate by reference, or your
              violation of any law or the rights of a third-party.
            </p>
          </div>
          <div className="policy-list">
            <h3 className="policy-title">Governing Law and Jurisdiction</h3>
            <p>
              Modification of Terms and Conditions : Godachi reserves the right
              at any time to modify the terms and conditions of this User
              Agreement without any prior notification to any of the user. This
              site disclaimer and user Agreement shall be construed in
              accordance with the applicable laws of India, and you and we agree
              to use Harda and Jabalpur jurisdiction in Madhya Pradesh, if there
              is any dispute between us. If any part of this Site Disclaimer is
              found to be invalid by law, the rest of them remain valid and
              enforceable.
            </p>
          </div>
          <div className="policy-list">
            <h3 className="policy-title">Arbitration</h3>
            <p>
              If any dispute arises between you and the Company during your use
              of the Site or thereafter, in connection with the validity,
              interpretation, implementation or alleged breach of any provision
              of this Agreement, and the Privacy Policy or the documents they
              incorporate by reference, the dispute shall be referred to a sole
              Arbitrator who shall be an independent and neutral third party
              identified by Godachi.{" "}
            </p>
          </div>
          <div className="policy-list">
            <h3 className="policy-title">Force majeure</h3>
            <p>
              We are not liable for any delay in the performance or
              non-performance of any of our obligations hereunder and shall not
              be liable for any loss or damages caused thereby where the same is
              occasioned by any cause whatsoever that is beyond our control
              including but not limited to an act of God, war, civil
              disturbance, governmental or parliamentary restrictions,
              prohibitions or enactments of any kind, import or export
              regulations, exchange control regulations or accident or
              non-availability/ delay in transport or any pandemic
              circumstances.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
          

      </>
   );
};

export default Page;
