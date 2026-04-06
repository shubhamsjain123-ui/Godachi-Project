

const Page = ({ state = {}, selectedVariant=0, metalNameDetail = "" }) => {
  const variantDetails = state.variant_products[selectedVariant];
  const otherSpecs = state.otherSpecs;
  const metalDetails = state?.productMetalComponents
                        .map((metalComp)=>{
                          return {
                            ...metalComp,
                            ...variantDetails.metalDetails.filter((details)=>details.component===metalComp._id)[0]
                          }
                        });
  const diamondDetails = state?.productDiamondComponents
                        .map((diamondComp)=>{
                          return {
                            ...diamondComp,
                            ...variantDetails.diamondDetails.filter((details)=>details.component===diamondComp._id)[0]
                          }
                        });
  const stoneDetails = state?.productStoneComponents
                        .map((stoneDetail)=>{
                          return{
                            ...stoneDetail,
                            ...variantDetails.stoneDetails.filter((details)=>details.component===stoneDetail._id)[0],
                            stoneTypeName: stoneDetail.stoneType.name
                          }
                        });
  const stoneArray = stoneDetails.reduce((r, a) => {
                       r[a.stoneTypeName] = [...r[a.stoneTypeName] || [], a];
                       return r;
                      }, {});
  
   return (
      <div className="details">
        <div className="top">
          <div className="sku">
            <label>Style No</label>
            <span className="values sku_value">{state.styleNo}</span>
          </div>
          <div className="sku">
            <label>Product Code</label>
            <span className="values sku_value">{variantDetails.productCode}</span>
          </div>
         
         
          {
            variantDetails.width && 
            <div className="width">
              <label>Width</label>
              <span className="values">
                {`${variantDetails.width} ${variantDetails.widthUnit}`}
              </span>
            </div>
          }
           {
            variantDetails.height &&
            <div className="height">
              <label>Height</label>
              <span className="values">
                {`${variantDetails.height} ${variantDetails.heightUnit}`}
              </span>
            </div>
          }
          {
            variantDetails.length &&
            <div className="length">
              <label>Length</label>
              <span className="values">
                {`${variantDetails.length} ${variantDetails.lengthUnit}`}
              </span>
            </div>
          }
         
          {/* <div className="necklace_length"><label>Chain Length</label><span className="values" id="necklace_length">38.10 cm&nbsp;&nbsp;&nbsp;&nbsp;(15 inches)</span></div> */}
          {
            metalNameDetail!="Silver" &&
            <div className="total_weight last">
              <label>Total Weight</label>
              <span className="values" id="total_weight">
                {`${variantDetails.totalWeight} ${variantDetails.totalWeightUnit}`}
              </span>
            </div>
          }
          
        </div>
        {
          metalDetails.length>0 &&
          metalDetails.map((metalDetail)=>{
            var metal_name = metalDetail.metalType.name;
            return(
               <div className="metal_details">
                <div className="title">Metal Details</div>
                <div className="metal">
                  <label>Metal</label>
                  <span className="values selected_metal_text">
                    {
                      metalDetail.metalType.name
                    }
                  </span>
                </div>
                <div className="purity">
                  <label>Purity</label>
                  <span className="values selected_karat_right">
                    {
                      metalDetail.metalPurity.name
                    }
                  </span>
                </div>
                <div className="purity">
                  <label>Color</label>
                  <span className="values selected_karat_right">
                    {
                      metalDetail?.metalColor?.name
                    }
                  </span>
                </div>
                {
                  metal_name!="Silver" && metalDetail.weight &&
                  <div className="metal_weight last">
                    <label>Metal Weight (Approx)</label>
                    <span className="values" id="metal_weight">
                      {`${metalDetail.weight} ${metalDetail.weightUnit}`}
                    </span>
                  </div>
                }
                
              </div>
            )
          })
        }
         {
          diamondDetails.length>0 &&
          <div className="metal_details">
            <div className="title">Diamond Details</div>
            <div>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col" style={{color:"#716f6f"}}>No. of Diamonds</th>
                    <th scope="col" style={{color:"#716f6f"}}>weight</th>
                    {
                      diamondDetails[0].diamondVariants.length>0 && diamondDetails[0].diamondVariants[0]?.variantValue &&
                      diamondDetails[0].diamondVariants.map((variant)=>{
                        return(
                          <th scope="col" style={{color:"#716f6f"}}>{variant?.variantMaster?.name}</th>
                        )
                      })
                    }
                    
                  </tr>
                </thead>
                <tbody>
                  {
                    diamondDetails.map((diamondDetail)=>{
                      return(
                        <tr>
                          <td>{diamondDetail.noOfStones}</td>
                          <td>
                            { diamondDetail.weight && `${diamondDetail.weight} ${diamondDetail.weightUnit}`}
                          </td>
                          {
                            diamondDetail.diamondVariants.length>0 && diamondDetail.diamondVariants[0]?.variantValue &&
                            diamondDetail.diamondVariants.map((variant)=>{
                              return(
                                <td>{variant?.variantValue?.name}</td>
                              )
                            })
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
        {
          stoneArray &&
          Object.entries(stoneArray).map(([key,value])=>{
            var stoneVariant = value[0].stoneVariants;
            
            return(
               <div className="diamond_details">
                <div className="title">{key} Details</div>
                {/*Start Custome product Details */}
                <div>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col" style={{color:"#716f6f"}}>No. of {key}</th>
                        <th scope="col" style={{color:"#716f6f"}}>weight</th>
                        {
                          stoneVariant.length>0 && stoneVariant[0]?.variantValue &&
                          stoneVariant.map((variant)=>{
                            return(
                              <th scope="col" style={{color:"#716f6f"}}>{variant?.variantMaster?.name}</th>
                            )
                          })
                        }
                        {/* {
                          Object.entries(stoneVariant).map(([varKey,varValue])=>{
                            return(
                               <th scope="col">{varKey}</th>
                            )
                          })
                        } */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        value.map((stoneDetail)=>{
                          return(
                            <tr>
                              <td>{stoneDetail.noOfStones}</td>
                              <td>
                                { stoneDetail.weight && `${stoneDetail.weight} ${stoneDetail.weightUnit}`}
                              </td>
                              {
                                stoneVariant.length>0 && stoneVariant[0]?.variantValue &&
                                stoneVariant.map((variant)=>{
                                  return(
                                    <td>{variant?.variantValue?.name}</td>
                                  )
                                })
                              }
                              {/* {
                                Object.entries(stoneVariant).map(([varKey,varValue])=>{
                                  return(
                                     <td scope="col">{stoneDetail.stoneVariants[varKey]}</td>
                                  )
                                })
                              } */}
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })
        }

        {
          otherSpecs.length>0 &&
          otherSpecs.map((otherSpec)=>{
            return(
               <div className="metal_details">
                {
                  otherSpec.heading &&
                  <div className="title">{otherSpec.heading}</div>
                }
                {
                  otherSpec.specs && otherSpec.specs.length>0 &&
                  otherSpec.specs.map((specDetail)=>{
                    return(
                      <div className="metal">
                        <label>{specDetail.name}</label>
                        <span className="values selected_metal_text">
                          { specDetail.value}
                        </span>
                      </div>
                    )
                  })
                }
               
              </div>
            )
          })
        }

        {
          state.productCare &&
          <div className="metal_details">
            <div className="title">Product Care</div>
            <p className="notes" >{state.productCare}</p>
          </div>
        }
        
        <div className="metal_details">
          <div className="title">Occasion</div>
          <ul
            className="blog-tags"
            style={{ float: "left", padding: 10 }}
          >
            {
              state.occassions.map((occassion)=>{
                return(
                  <li>
                    <a href="#">{occassion.name}</a>
                  </li>
                )
              })
            }
            
          </ul>
        </div>
        {
          state.tags &&
          <div className="metal_details">
            <div className="title">Tags</div>
            <ul
              className="blog-tags"
              style={{ float: "left", padding: 10 }}
            >
              {
                state.tags.map((tag)=>{
                  return(
                    <li>
                      <a href="#">{tag.name}</a>
                    </li>
                  )
                })
              }
              
            </ul>
          </div>
        }
        {
          state.note && 
          <p className="notes1" style={{}}>
            {`Note: ${state.note}`}
          </p>
        }
       
      </div>
   );
};

export default Page;
