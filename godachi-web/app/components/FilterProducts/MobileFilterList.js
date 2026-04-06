import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import filterRouteLinkGenerate from "./filterRouterLink";

import { filterProducts_r } from "../../../redux/actions";

import Filter from "./Filter";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

const Page = () => {
    const { filterMasters } = useSelector(({ filterMasters }) => filterMasters);
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);

    const [mainFilters, setMainFilters] = useState([]);
    const [otherFilters, setOtherFilters] = useState([]);
    const [noShowFilters, setNoShowFilters] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        //setMainFilters(filterMasters.filter((filter) => filter.type == "main"));
        setOtherFilters(filterMasters.filter((filter) => (filter.type == "other" || filter.type == "main")));
        setNoShowFilters(filterMasters.filter((filter) => filter.type == "noshow"));
    }, [filterMasters]);

    return (
        <>
            <div
                className="top-bar-left"
                
            >
                <div
                    className="col-lg-12"
                    
                >
                    
                    <div className="product-view-mode">
                        <div className="header-top-settings">
                            <ul className="nav align-items-center" style={{justifyContent:'space-between'}}>
                                {
                                    mainFilters.map((filter, key) => {
                                        return (
                                            <Filter key={key} filterDetails={filter} />
                                        )
                                    })
                                }
                                <li className="curreny-wrap">
                                    <Button onClick={handleShow} style={{
                                        background: "#2fbccc",
                                        padding: "10px 16px",
                                        fontSize: 13,
                                        marginLeft: 10,
                                        borderRadius: 4,
                                        color: "white",
                                        width: 112
                                    }}>
                                        Filter By
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
						Filter By :
					</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey={otherFilters.length > 0 ? otherFilters[0].shortName : ""}>
                        <Row>
                            <div className="col-4 filter-headings">
                                <Nav variant="pills" className="flex-column"
								style={{borderRight: "1px solid #f1f1f1",paddingRight: "8px"}}
								>
                                    {
                                        otherFilters.map((filter, key) => {
                                            return (
                                                <Nav.Item key={key}>
                                                    <Nav.Link eventKey={filter.shortName}>
                                                        {filter.name}
                                                        {
                                                            filterProducts[filter.shortName]?.length > 0 ?
                                                                <Badge bg="secondary">{filterProducts[filter.shortName].length}</Badge>
                                                                : null
                                                        }
                                                    </Nav.Link>
                                                </Nav.Item>
                                            )
                                        })
                                    }
                                </Nav>
                            </div>
                            <div className="col-8 filter-options">
                                <Tab.Content>
                                    {
                                        otherFilters.map((filter, key) => {
                                            return (
                                                <Filter key={key} filterDetails={filter} type="modal" />
                                            )
                                        })
                                    }
                                </Tab.Content>
                            </div>
                        </Row>
                    </Tab.Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Page;
