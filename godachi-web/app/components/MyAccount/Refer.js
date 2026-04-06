import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { message } from "antd";
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon,
  } from 'next-share';

  
const Defaut = () => {
   const { isAuthenticated, user } = useSelector((state) => state.login);
   const [shareLink, setShareLink] = useState(`${process.env.NEXT_PUBLIC_WEB_URL}refer/${user.referralCode}`);
   return (
      <>
         <div id="dashboad">
            <div className="myaccount-content">
                
            <div className="text-center">
                                <h3 className="font-weight-bold">Referrals</h3>
                                <p className="shareDescription text-capitalize">Invite your friends to Godachi to upgrade your membership</p>
                                <div className="mt-1 row">
                                    <div className="plan-line col">
                                        <div className="text-center process-box">
                                        <i className="fa fa-envelope" />
                                        <h4 className="pt-1">Send Invitation</h4>
                                        <p className="text-muted shareDescription">
                                            Send your referral link to your friend and ask them to join the revolution.
                                        </p>
                                        </div>
                                    </div>
                                    <div className="plan-line col">
                                        <div className="text-center process-box">
                                        <i className="fa fa-user-plus" />
                                        <h4 className="pt-1">Registration</h4>
                                        <p className="text-muted shareDescription">
                                            Let them register to our services using your referral link.
                                        </p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="text-center process-box">
                                        <i className="fa fa-gift" />
                                        <h4 className="pt-1">Earn Rewards</h4>
                                        <p className="text-muted shareDescription">
                                            As your friends join using your referral link, your will be rewarded credits for your referral.
                                        </p>
                                        </div>
                                    </div>
                                    </div>

                            </div>
                {
                    isAuthenticated && 
                    <div className="text-center mt-5">
                        <h3 className="font-weight-bold">Share your Referral Link</h3>
                        <p className="shareDescription">You can share your referral link by copying and sending it or sharing it on your social media.</p>
                        <div className="referralLinkDiv">
                            <div className="row">
                                <div className="text-start col-md-8">
                                    <a href={shareLink} target="_blank" className="font-weight-bold">{shareLink}</a>
                                </div>
                                <div className="text-end col-md-4">
                                    <span className="btn btn-sm btn-link font-weight-bold" 
                                        onClick={() => {
                                            navigator.clipboard.writeText(shareLink)
                                            message.success("Link copied successfully to clipboard")
                                        }}
                                    >Copy Link</span>
                                </div>
                            </div>
                        </div>
                        <div className="sharerLinks">

                            <WhatsappShareButton
                                url={shareLink}
                                title={'Join Godachi using my referral link'}
                                blankTarget={true}
                                >
                                <WhatsappIcon size={40} round />
                            </WhatsappShareButton>


                            <FacebookShareButton
                                url={shareLink}
                                quote={'Join Godachi using my referral link'}
                                blankTarget={true}
                            >
                                <FacebookIcon size={40} round />
                            </FacebookShareButton>

                            <LinkedinShareButton url={shareLink} blankTarget={true}>
                                <LinkedinIcon size={40} round />
                            </LinkedinShareButton>

                            <TelegramShareButton
                                url={shareLink}
                                title={'Join Godachi using my referral link'}
                                blankTarget={true}
                            >
                                <TelegramIcon size={40} round />
                            </TelegramShareButton>

                            <TwitterShareButton
                                url={shareLink}
                                title={'Join Godachi using my referral link'}
                                blankTarget={true}
                            >
                                <TwitterIcon size={40} round />
                            </TwitterShareButton>

                            <EmailShareButton
                                url={shareLink}
                                subject={'Join Godachi using my referral link'}
                                body="Join Godachi using my referral link"
                                blankTarget={true}
                            >
                                <EmailIcon size={40} round />
                            </EmailShareButton>
                        </div>
                    </div>
                }

                {
                    !isAuthenticated && 
                    <div className="text-center mt-5">
                        <h3 className="font-weight-bold">Signin to share your Referral Link</h3>
                        <p className="shareDescription">You can share your referral link by copying and sending it or sharing it on your social media.</p>
                        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 text-center">
                            <Link href="/signin">
                                <a>
                                    <button className="subscribe-btn" >
                                        Signin
                                    </button>
                                </a>
                                
                            </Link>
                        </div>
                        
                    </div>
                }
                
                
            </div>
        </div>
        
      </>
   );
};

export default Defaut;
