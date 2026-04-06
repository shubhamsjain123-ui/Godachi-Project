import Breadcrumbs from 'nextjs-breadcrumbs';
const Default = (props) => {
   return (
      <>
        <div className="breadcrumb-area">
            <div className="container">
            <div className="row">
                <div className="col-12">
                    <Breadcrumbs 
                        rootLabel="Home" 
                        replaceCharacterList={[{ from: '.', to: ' ' }]}
                        containerClassName="breadcrumb-wrap"
                        listClassName="breadcrumb"
                        activeItemClassName="breadcrumb-item active"
                        inactiveItemClassName="breadcrumb-item"
                        
                    />
                </div>
            </div>
            </div>
        </div>
      </>
   );
};

export default Default;
