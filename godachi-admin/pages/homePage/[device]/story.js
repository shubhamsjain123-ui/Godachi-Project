import Story from '../../../app/components/HomePage/story';
import router from "next/router";
const StoryMaster = () => {
  const { device } = router.query;
    return (
      <>
        <Story section="story" device={device}/>
      </>
        
    );
}

export default StoryMaster;