import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import {
  Button,
  message,
  Col,
  Form,
  Input,
  Row,
} from "antd";
import IntlMessages from "../../util/IntlMessages";

const Default = ({
    selectedVariantId,
    onSuccess
}) => {

  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  // componentDidMount = useEffect
  useEffect(() => {}, []);

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
  
  const onSubmit = (Data) => {
    Data["created_user"] = { name: user.name, id: user.id };

    axios
      .post(`${API_URL}/productInventory/addNote/${selectedVariantId}`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(
            res.data.messagge
          );
        } else {
          message.success("Updated Successfully");
          onSuccess();
          form.resetFields();
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
       <Form
          layout="vertical"
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          scrollToFirstError
        >
          <Row gutter={12}>            
            <Col span={24}>
              <Form.Item
                name="note"
                label="Note"
              >
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              <IntlMessages id="app.pages.common.save" />
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
};

export default Default;
