import React ,{useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import loginIcon from '../Images/login.png'
import uiImg from '../Images/login_bg.png';
import './Login.css';
import web3 from '../../web3'
import contract from '../../contract'
import ipfs from '../../ipfs'
//import { ToastHeader } from 'react-bootstrap';
//import { Toast } from 'bootstrap';
const Login = () => {
    //const classes = useStyles();
    const [ServicePData, setData] = useState({
        email:"",name:"",loc:"",mob:""
    })

    const handleChange = (event) =>
    {
        const id = event.target.id;
        console.log(id)
        var value = event.target.value;
        setData({
            ...ServicePData, [id]: value
        })
        console.log(ServicePData)
    }
    
    const submitForm = async (event) => {
        event.preventDefault();
        await web3.eth.getAccounts().then(async function (acc) {
            console.log(acc[0]);
            await ipfs.addJSON(ServicePData, async (err, hash) => {
                if (err) {
                    alert("Data not stored");
                }
                else
                {
                    await contract.methods.addServiceP(hash).send({
                        from :acc[0],gas:3000000
                    }).then(function (err2, result) {
                        if (err)
                        {
                            alert("Uset Already exist");
                        }
                        else
                        {
                            alert("new Client Address");
                        }
                    })
                    }
            })
        })
        alert("Form Submitted");
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
                        <img className="icon-img" src={loginIcon} alt="icon"/>
                        <Form  onSubmit={submitForm} autoComplete="off">
                        <Form.Group >
                                <Form.Control type="email" id="email"
                                    placeholder="Enter email"
                                    value={ServicePData.email}
                                    onChange={handleChange}
                                    required />
                        </Form.Group>

                        <Form.Group >
                                <Form.Control type="text" id="name"
                                    placeholder="Enter Your Name"
                                    value={ServicePData.name}
                                    onChange={handleChange}
                                    required />
                        </Form.Group>

                        <Form.Group >
                                <Form.Control type="text" id="mob"
                                    placeholder="Enter Your Mobile Number"
                                    value={ServicePData.mob}
                                    onChange={handleChange}
                                    required/>
                        </Form.Group>
                        
                        <Form.Group >
                                <Form.Control type="type" id="loc"
                                    placeholder="Enter your Location"
                                    value={ServicePData.loc}
                                    onChange={handleChange}
                                    required/>
                        </Form.Group>

                        <Button variant="primary btn-block" type="submit">Register</Button>

                        <div className="text-left mt-3">
                            <a href="/"><small className="reset">Go Back To Home</small></a> 
                            
                        </div>
                        </Form>
                        </Col>

                    <Col lg={8} md={6} sm={12}>
                        <img className="w-100" src={uiImg} alt=""/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;