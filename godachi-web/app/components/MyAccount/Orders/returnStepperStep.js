const Defaut = ({
  stepperText,
  active
}) => {
   return (
      <>
        <div 
            className={`stepper-item ${active?"completed":"active"}`}
        >
            <div className="step-counter">
                {
                    active?
                    <i className="fa fa-check" />
                    :
                    <i
                        style={{ color: "gray" }}
                        className="fa fa-circle"
                    />
                }
                
            </div>
            <div className="step-name">{stepperText}</div>
        </div>
      </>
   );
};

export default Defaut;
