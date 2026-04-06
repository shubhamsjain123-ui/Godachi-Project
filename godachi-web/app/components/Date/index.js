import moment from "moment";
const Default = ({ data }) => {
  return (
    <>
      {
        data?
            moment(data).format("DD-MMM-YY")
        : null
      }
    </>
  );
};

export default Default;
