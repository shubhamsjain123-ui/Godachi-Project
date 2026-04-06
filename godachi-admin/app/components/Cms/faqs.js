import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config/config";
import { useRouter } from "next/router";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import {
  Space,
  Button,
  Card,
  message,
  Divider,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  TreeSelect,
  Collapse, 
  Select
} from "antd";
const { Panel } = Collapse;
import func from "../../../util/helpers/func";
import { useIntl } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const Faq = (props) => {
  const intl = useIntl();
  //var faqDetails = props?.details;
  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const router = useRouter();
  const [faqDetails, setFaqDetails] = useState({});
  const [dataCategories, seTdataCategories] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState(props?.categoryId)
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const getDataCategory = () => {
    axios
      .get(`${API_URL}/cms/faqCategory`)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.result;
          seTdataCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  function getData() {
    axios.get(`${API_URL}/cms/faqs/${selectedCategory}`).then((response) => {
      console.log(response.data);
      var output = Object.entries({faqs:response.data.length>0?response.data:[""]}).map(([name, value]) => ({
        name,
        value,
      }));

      setFaqDetails(output);
    });
  }

  const onSubmit = (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };
    Data["typeId"] = selectedCategory;
    axios
      .post(`${API_URL}/cms/faqs/add`, Data)
      .then((res) => {
        if (res.data.master == "error") {
          message.error(
            "Faq not added" + res.data.messagge
          );
        } else {
          message.success("Faq Added");
        }
      })
      .catch((err) => console.log(err));
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  useEffect(() => {
    getDataCategory();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  return (
    <div>
      <Card className="card" title="Add Faq">
        <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={faqDetails}
          scrollToFirstError
          initialValues={{ faqs: [""] }}
        >
        <Form.Item
          label="Category"
        > 
          <Select
            options={dataCategories.map((cat)=>{
              return {
                label: cat.name,
                value: cat._id
              }
            })}
            
            onChange={(newValue) => {
              //seTstate({ ...state, categories_id: newValue });
              setSelectedCategory(newValue);
            }}
            value={selectedCategory}
          />
        </Form.Item>
       
        <Divider />
              <Form.List name="faqs">
                {(fields, { add, remove }) => (
                  <>
                    <Collapse defaultActiveKey={[0]}>
                    {fields.map((field, i) => (
                      <>
                        
                        
                          <Panel 
                            className="mb-5"
                            header={
                              <Form.Item
                                {...field}
                                name={[field.name, "question"]}
                                fieldKey={[field.fieldKey, "question"]}
                                rules={[{ required: true, message: "Please fill this input."}]}
                                style={{width:"100%"}}
                              >
                                <Input placeHolder="Question" onClick={event => event.stopPropagation()}/>
                              </Form.Item>
                            }
                            extra={
                              <Form.Item className="float-left">
                                <Button
                                  type="primary"
                                  shape="circle"
                                  onClick={() => remove(field.name)}
                                  icon={<DeleteOutlined />}
                                />
                            </Form.Item>
                            }
                            key={i}
                          >
                            <Form.Item
                              name={[field.name, "_id"]}
                              hidden={true}
                            >
                              <Input />
                            </Form.Item>

                             <Form.Item
                              {...field}
                              label="Answer"
                              name={[field.name, "answer"]}
                              fieldKey={[field.fieldKey, "answer"]}
                              rules={[{ required: true, message: "Please fill this input."}]}
                            >
                              <Input.TextArea rows={1} placeHolder="Answer"/>
                            </Form.Item>
                          </Panel>                     
                      </>
                    ))}
                    </Collapse>
                    <Form.Item className="float-right">
                      <Button
                        className="float-right"
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add Faq
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            <Divider />
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              <IntlMessages id="app.pages.common.save" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Faq;
