import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config/config";
import Link from "next/link";
import { Row, Col, Button } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import func from "../../../util/helpers/func";
import { useIntl } from "react-intl";

const Default = (props) => {
    const {
        productDetails,
        onProductSelect
    } = props;

    return(
        <div className="offerProductCard" key={productDetails._id}>
            <Row gutter={12}>
                <Col span={8}>

                </Col>
                <Col span={16}>
                    <div>
                        <h4>{productDetails.product.productName}</h4>
                    </div>
                    <div>
                        <Row>
                            <Col span={12}>
                                {productDetails.productCode}
                            </Col>
                            <Col span={12}>
                                <Button 
                                    type="primary" 
                                    icon={<CheckSquareOutlined />}
                                    size="small"
                                    onClick={onProductSelect}
                                >
                                    Select
                                </Button>
                            </Col>
                        </Row>
                        
                    </div>
                </Col>
            </Row>
            
        </div>
    )
};

export default Default;
