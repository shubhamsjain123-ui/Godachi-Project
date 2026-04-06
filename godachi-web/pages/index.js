import func from "../util/helpers/func";
import axios from "axios";
import { wrapper } from "../redux/store";
import { API_URL, NEXT_API_URL } from "../config/config";

import dynamic from "next/dynamic";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const HomeSlider = dynamic(() => import("../app/components/HomePage/HomeSlider"));
const SaleText = dynamic(() => import("../app/components/HomePage/SaleText"));
const HomePromises = dynamic(() => import("../app/components/HomePage/HomePromises"));
const HomeCategories = dynamic(() => import("../app/components/HomePage/HomeCategories"));
const HomeOccassions = dynamic(() => import("../app/components/HomePage/HomeOccassions"));
const HomeVideo = dynamic(() => import("../app/components/HomePage/HomeVideo"));
const HomeNewArrival = dynamic(() => import("../app/components/HomePage/HomeNewArrival"));
const HomeTopTrending = dynamic(() => import("../app/components/HomePage/HomeTopTrending"));
const HomeOurStory = dynamic(() => import("../app/components/HomePage/HomeOurStory"));
const HomeBestSeller = dynamic(() => import("../app/components/HomePage/HomeBestSeller"));
const HomeListing = dynamic(() => import("../app/components/HomePage/HomeListing"));
const HomeNews = dynamic(() => import("../app/components/HomePage/HomeNews"));
const HomeStats = dynamic(() => import("../app/components/HomePage/HomeStats"));
const HomeExplore = dynamic(() => import("../app/components/HomePage/HomeExplore"));
const HomeBlogs = dynamic(() => import("../app/components/HomePage/HomeBlogs"));
const HomeTestimonials = dynamic(() => import("../app/components/HomePage/HomeTestimonials"));
const HomeOffers = dynamic(() => import("../app/components/HomePage/HomeOffers"));
const HomeGodachiOffers = dynamic(() => import("../app/components/HomePage/HomeGodachiOffers"));
const HomeBrands = dynamic(() => import("../app/components/HomePage/HomeBrands"));

const homePage = ({
  homeData = {},
}) => {
  console.log(homeData)
  const getSectionData = (sectionName) => {
    var sectionDetails = homeData.section.find((section) => section.section == sectionName);
    return sectionDetails;
  }
  return (
    <>
      <HomeSlider data={getSectionData("slider")} />
      <SaleText />
      <HomePromises data={homeData?.promise} />
      <HomeCategories data={homeData?.category} />
      <HomeGodachiOffers />
      <HomeOccassions data={homeData?.occassion} />
      {/* <HomeVideo data={getSectionData("video")}/> */}
      {/* <div className="mt-5 vid_banner_image">
        <a target="_blank" href="/images/Shop Now.pdf">
          <img src="/images/vid_banner.jpg" />
        </a>
      </div> */}
      <HomeNewArrival data={getSectionData("newArrival")} />
      <HomeTopTrending data={getSectionData("trending")} />
      <HomeOurStory data={getSectionData("story")} />
      <HomeBestSeller data={getSectionData("bestSeller")} />

      <HomeListing
        data={getSectionData("listing")}
        premiumProducts={homeData?.premiumProducts}
        onSaleProducts={homeData?.onSaleProducts}
      />

      {/* <HomeNews data={getSectionData("news")}/> */}
      <HomeStats data={getSectionData("stats")} />
      <HomeExplore data={getSectionData("explore")} />
      {/* <HomeBlogs data={getSectionData("blog")}/> */}
      <HomeTestimonials data={getSectionData("testimonial")} />

      {/* <HomeOffers data={getSectionData("offers")}/>
      <HomeBrands data={getSectionData("brands")}/> */}
    </>

  );
};

/*export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  //const response = await axios.get(`${NEXT_API_URL}/homesliderpublic/web`);

  let response;

try {
  response = await axios.get("http://localhost:5000/homesliderpublic/web");
} catch (e) {
  console.log("API failed, using dummy data");

  response = {
    data: {
      section: [
        { section: "slider", data: [] },
        { section: "newArrival", data: [] },
        { section: "trending", data: [] },
        { section: "story", data: [] },
        { section: "bestSeller", data: [] },
        { section: "listing", data: [] },
        { section: "stats", data: [] },
        { section: "explore", data: [] },
        { section: "testimonial", data: [] }
      ],
      promise: [],
      category: [],
      occassion: [],
      premiumProducts: [],
      onSaleProducts: []
    }
  };
}

  return {
    props: {
      homeData: response.data,
    },
  };
});*/


export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  let response;

  try {
    response = await axios.get(`${NEXT_API_URL}/homesliderpublic/web`);
  } catch (e) {
    console.log("API failed, using dummy data");

    response = {
      data: {
        section: [
          {
            section: "slider",
            media: [
              { image: "/images/demo1.jpg" },
              { image: "/images/demo2.jpg" }
            ]
          }
        ],
        promise: [],
        category: [],
        occassion: [],
        premiumProducts: [],
        onSaleProducts: []
      }
    };
  }

  return {
    props: {
      homeData: response.data,
    },
  };
});

export default homePage;
