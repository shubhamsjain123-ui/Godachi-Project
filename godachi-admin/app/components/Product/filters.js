import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config/config";
import Link from "next/link";
import { Row, Col, Button, Select, Card  } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import func from "../../../util/helpers/func";
import { useIntl } from "react-intl";

const Default = (props) => {
    const { 
        search,
        onFilterChange
    } = props;
    const [adminProductFilter, setAdminProductFilter] = useState([]);
    const getProductFilters = ()=>{
      axios
      .post(`${API_URL}/filterMaster/adminProductFilters`,)
      .then((res) => {
        if (res.data) {
            setAdminProductFilter(res.data);
        }
      })
      .catch((err) => console.log(err));
    }
    useEffect(()=>{
        getProductFilters();
    },[])
    return(
        <Card
            title="Filter Products"
            >
                <Row gutter={12}>
                    {
                        search &&
                        <Col span={6}>
                            <div>
                                <h5>Search</h5>
                                <div>
                                 {search}
                                </div>
                            </div>
                            
                        </Col>
                    }
                    {
                        adminProductFilter.map((filter)=>{
                            return(
                                <Col span={6}>
                                    <div>
                                        <h5>{filter.name} Filter</h5>
                                        <div>
                                            <Select
                                                mode="multiple"
                                                allowClear
                                                style={{ width: "100%" }}
                                                options={filter.options}
                                                onChange={(value)=>{onFilterChange(filter.shortName,value)}}
                                            />
                                        </div>
                                    </div>
                                
                                </Col>
                            )
                        })
                    }
                    
                </Row>
            </Card>
        
    )
};

export default Default;
