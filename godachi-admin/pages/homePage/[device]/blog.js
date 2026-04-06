import Blog from '../../../app/components/HomePage/blog';
import router from "next/router";
const BlogMaster = () => {
  const { device } = router.query;
    return (
      <>
        <Blog section="blog" device={device}/>
      </>
        
    );
}

export default BlogMaster;