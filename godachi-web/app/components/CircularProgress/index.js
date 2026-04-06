import Image from "next/image";

const CircularProgress = ({ className }) => (
   <div className={`loader ${className}`}>
      <Image src="/images/loader.gif" alt="loader" width={30} height={30} />
      {/* <img src="/images/loader.gif" alt="loader" style={{ height: 30 }} /> */}
      <div className="pt-2">Fetching Results</div>
   </div>
);
export default CircularProgress;
CircularProgress.defaultProps = {
   className: "",
};
