import { useSelector } from "react-redux";

const Default = ({ data = 0, fraction = 2 }) => {
   const { settings } = useSelector(({ settings }) => settings);
   return (
      <>
         {settings.price_type ? (
            <>
               {
                  data.toLocaleString("en-IN", { 
                                                maximumFractionDigits: fraction,
                                                style: 'currency',
                                                currency: 'INR' 
                                             }
                                    )
               }
            </>
         ) : (
            <>
               {
                  data.toLocaleString("en-IN", { 
                                                maximumFractionDigits: fraction,
                                                style: 'currency',
                                                currency: 'INR' 
                                             }
                                    )
               }
            </>
         )}
      </>
   );
};

export default Default;
