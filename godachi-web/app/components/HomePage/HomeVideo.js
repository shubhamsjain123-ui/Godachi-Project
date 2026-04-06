import Link from "next/link";
import { IMG_URL } from "../../../config/config";
import ReactPlayer from 'react-player';

const Default = ({data}) => {
   console.log(data);
   if(!data)
    return(<></>)

   return (
      <>
         <section className="about-us section-padding">
         <div className="row">
            <div id="video-container">
               <ReactPlayer 
                  url={IMG_URL + data.media[0].image} 
                  controls= {false}
                  playing={true}
                  muted={true}
                  loop={true}
                  width="100%"
                  height="100%"
               />
            </div>
         </div>
         </section>
         
      </>
   );
};

export default Default;
