import { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  Typography,
  Select,
  Checkbox
} from "antd";
import { useIntl } from "react-intl";
import IntlMessages from "../util/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { switchLanguage, login_r, isAuthenticated_r } from "../redux/actions";
import { languageData } from "../config/config";

import AuthService from "../util/services/authservice";

const SignInPage = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(({ login }) => login);

  console.log("isAuthenticated", isAuthenticated);
  const { locale } = useSelector(({ settings }) => settings);

  useEffect(() => {
    if (isAuthenticated) {
      return Router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmit = (Data) => {
    AuthService.login(Data).then((data) => {
      const { isAuthenticated, user } = data;

      if (isAuthenticated) {
        dispatch(login_r(user));
        dispatch(isAuthenticated_r(true));

        Router.push("/dashboard");
        message.success(intl.messages["app.userAuth.Login Successfully."]);
      } else {
        message.error(intl.messages["app.userAuth.You did not login."]);
        Router.replace("/signin");
      }
    });
  };

  return (
    <>
       <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
            
              
            </div>
            <div className="gx-app-logo-wid">
              <img alt="Godachi" src={"/images/logo.png"}/>
              
            </div>
            <div className="gx-app-logo">
              <h1>Sign In</h1>
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{remember: true}}
              name="basic"
              onFinish={onSubmit}
              className="gx-signin-form gx-form-row0">

              <Form.Item
                rules={[{required: true, message: 'The input is not valid E-mail!'}]} name="username">
                <Input placeholder="Email"/>
              </Form.Item>
              <Form.Item
                rules={[{required: true, message: 'Please input your Password!'}]} name="password">
                <Input type="password" placeholder="Password"/>
              </Form.Item>
              <Form.Item>
                <Checkbox>by signing up, I accept</Checkbox>
                <span className="gx-signup-form-forgot gx-link">Term & Condition</span>
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  Sign In
                </Button>
                
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
     {/*  <Row gutter={[16, 16]}>
        <Col sm={6} offset={3} xs={18} className="my-5">
          
          <div className="mt-5" style={{paddingTop:"50px"}}>
            <a href="/">
              <img src="/images/logo.png" alt="Brand Logo" />
            </a>
          </div>
          <div level={5} className="text-center fs-10 mb-5">
            Fortune favors the bold.
          </div>
          <Form
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            layout="vertical"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: (
                    <IntlMessages id="app.userAuth.The input is not valid E-mail!" />
                  ),
                },
              ]}
              name="username"
              label={<IntlMessages id="app.userAuth.E-mail" />}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: (
                    <IntlMessages id="app.userAuth.Please input your Password!" />
                  ),
                },
              ]}
              name="password"
              label={<IntlMessages id="app.userAuth.Password" />}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="mb-0 w-full"
                size="large"
                htmlType="submit"
              >
                <IntlMessages id="app.userAuth.signIn" />
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="link"
            className="float-left"
            onClick={() => Router.push("/forgotpassword")}
          >
            <IntlMessages id="app.userAuth.Forgot Password" />
          </Button>
         
        </Col>
        <Col sm={3} xs={0} />
        <Col sm={12} xs={24}>
          <div className="loginBanner"></div>
        </Col>
      </Row> */}
    </>
  );
};

export default SignInPage;
