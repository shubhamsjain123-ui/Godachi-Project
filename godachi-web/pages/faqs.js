import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const BreadCrumb = dynamic(() => import("../app/components/BreadCrumb"));
import axios from "axios";
import { API_URL, NEXT_API_URL } from "../config/config";
import { Accordion } from "react-bootstrap";
const Page = ({
  faqList = []
}) => {  

   return (
      <>
        <BreadCrumb />
        <div className="my-account-wrapper section-padding">
          <div className="container">
            <div className="section-bg-color">
              <div className="row">
                <div className="col-lg-12">
                  {/* My Account Page Start */}
                  <div className="myaccount-page-wrapper">
                    {/* My Account Tab Menu Start */}
                    <div className="row">
                      <div className="col-lg-3 col-md-4">
                        <div className="myaccount-tab-menu nav" role="tablist">
                          {
                            faqList.map((faqCategory, index)=>{
                              return(
                                <a key={faqCategory._id} href={`#${faqCategory.name.replaceAll("&","").replaceAll(" ","-")}`} className={index==0?"active":"y"} data-bs-toggle="tab">
                                  {faqCategory.name}
                                </a>
                              )
                            })
                          }
                        </div>
                      </div>
                      {/* My Account Tab Menu End */}
                      {/* My Account Tab Content Start */}
                      <div className="col-lg-9 col-md-8">
                        <div className="tab-content" id="myaccountContent">
                          {
                            faqList.map((faqCategory, index)=>{
                              return(
                                <div
                                  className={`tab-pane fade ${index==0?" show active ":""}`}
                                  id={`${faqCategory.name.replaceAll("&","").replaceAll(" ","-")}`}
                                  role="tabpanel"
                                  key={faqCategory._id}
                                >
                                  <div className="myaccount-content">
                                    <h5>{`${faqCategory.name}`} FAQs</h5>
                                    <div className="faq-container">
                                      <Accordion defaultActiveKey={0}>
                                        {
                                          faqCategory?.faqs.map((faq, faqIndex)=>{
                                            return(
                                              <Accordion.Item eventKey={faqIndex} key={faq._id}>
                                                <Accordion.Header>
                                                  <h3 className="faq-title">
                                                    {faq.question}
                                                  </h3>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                  {faq.answer}
                                                </Accordion.Body>
                                              </Accordion.Item>
                                              
                                            )
                                          })
                                        }
                                      </Accordion>
                                      {/* {
                                        faqCategory?.faqs.map((faq, faqIndex)=>{
                                          return(
                                            <div className={`faq ${faqIndex==0?"active":""}`} key={faq._id}>
                                              <h3 className="faq-title">
                                                {faq.question}
                                              </h3>
                                              <p className="faq-text">{faq.answer}</p>
                                              <button className="faq-toggle">
                                                <i className="fa fa-chevron-down" />
                                                <i className="fa fa-times" />
                                              </button>
                                            </div>
                                          )
                                        })
                                      } */}
                                      
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>{" "}
                      {/* My Account Tab Content End */}
                    </div>
                  </div>{" "}
                  {/* My Account Page End */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
   );
};

export const getServerSideProps = async ({ query }) => {
  var faqList = [];
  const getFaqs = await axios.get(`${NEXT_API_URL}/cms/allFaqs`);
  if(getFaqs.data.success)
    faqList=getFaqs.data.result
  
  return {
     props: {
        faqList:faqList
     },
  };
};

export default Page;
