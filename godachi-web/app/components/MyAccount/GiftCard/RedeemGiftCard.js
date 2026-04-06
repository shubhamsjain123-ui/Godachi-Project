import { useState } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import { API_URL } from "../../../../config/config";
import { useRouter } from 'next/router'
import {Row, Col, Form, Button, InputGroup } from "react-bootstrap"

const Defaut = () => {
   const { user } = useSelector((state) => state.login);
   const router = useRouter();
    const [giftCode,setGiftCode] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = async(event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
       
        if (form.checkValidity() === false) {
            
        }
        else{
            try{
                var response = await axios.post(`${API_URL}/customers/redeemGiftCard`, {giftCode});
                if(response.data){
                    if(response.data.variant=="success"){
                        message.success(response.data.messagge);
                        router.push("/profile/wallet")
                    }
                    else if(response.data.variant=="error"){
                        message.error(response.data.messagge);
                    }
                }
            }
            catch(error){
                message.error(error.message)
            }
        }
        
    }


   return (
      <>
        <div className="contact-info">
            <h4 className="contact-title">
                The Gift Cards Store
            </h4>
            <p className="pb-0">
                Claritas est etiam processus dynamicus, qui sequitur mutationem
                consuetudium lectorum. Mirum est notare quam littera gothica, quam
                nunc putamus parum claram anteposuerit litterarum formas human.
            </p>
            <div className="contact-message redeem-card" style={{}}>
                <h4
                className="contact-title"
                style={{
                    color: "white",
                    borderBottom: "1px solid #fff",
                    marginBottom: 35
                }}
                >
                Redeem Your Gift Card :{" "}
                </h4>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="single-input-item">
                        <Form.Control required type="text" placeholder="Enter Gift Code" value={giftCode} onChange={({target:{value}})=>setGiftCode(value)} />
                    </Form.Group>
                    <button className="btn btn-sqr mt-3">
                        Redeem Gift Card
                    </button>
                </Form>
            </div>
        </div>
       

      </>
   );
};

export default Defaut;
