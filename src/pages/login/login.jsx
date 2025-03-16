import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Input } from "antd";

const Login = () => {
    const [phoneParts, setPhoneParts] = useState(["+998", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [page, setPage] = useState("login");
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

    const inputPlaceholder = ["+998", "97", "822", "24", "27"]


    const handlePhoneChange = (index, value) => {
        const maxLengths = [4, 2, 3, 2, 2]; // Har bir input uchun maksimal uzunlik

        if (/^\d*$/.test(value) && value.length <= maxLengths[index]) {
            const newPhoneParts = [...phoneParts];
            newPhoneParts[index] = value;
            setPhoneParts(newPhoneParts);

            if (value.length === maxLengths[index] && index < 4) {
                inputRefs[index + 1].current.focus();
            }
        }
    };


    if (page === "register") {
        return (
            <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                <Form initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
                    <Title>Ro‘yxatdan o‘tish</Title>
                    <MotionInput
                        placeholder="To‘liq ism va familiya"
                        value={""}
                        onChange={(e) => console.log(e.target.value)}
                    />
                    <PhoneContainerRegister  >
                        <PhoneInput value={phoneParts[0]} disabled />
                        <PhoneInput   />
                    </PhoneContainerRegister>
                    <MotionInput
                        type="password"
                        placeholder="Parol"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <MotionInput
                        type="password"
                        placeholder="Parolni takrorlang"
                        value={""}
                        onChange={(e) => console.log(e.target.value)}
                    />
                    <Button whileTap={{ scale: 0.9 }}>Ro‘yxatdan o‘tish</Button>
                    <RegisterText>Allaqachon hisobingiz bormi? <a href="#">Kirish</a></RegisterText>
                </Form>
            </Container>
        );
    }


    return (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Form initial={{ y: 50 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
                <Title initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>Login</Title>
                <PhoneContainer>
                    <PhoneInput value={phoneParts[0]} disabled />
                    {phoneParts.slice(1).map((part, index) => (
                        <React.Fragment key={index}>
                            <PhoneInput
                                ref={inputRefs[index + 1]}
                                placeholder={inputPlaceholder[index+1]}
                                value={part}
                                onChange={(e) => handlePhoneChange(index + 1, e.target.value)}
                            />
                        </React.Fragment>
                    ))}
                </PhoneContainer>
                <MotionInput
                    style={{width:'100%'}}
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <Button whileTap={{ scale: 0.9 }}>Login</Button>
                <RegisterText> Sizda hisob yo‘qmi? <span onClick={()=>setPage("register")} className={"link"}> Ro‘yxatdan o‘ting</span> </RegisterText>
            </Form>
        </Container>
    );
};

export default Login;

const Container = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #121212;
`;

const Form = styled(motion.div)`
    background: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);

    display: flex;
    flex-direction: column;
    gap: 5px;
    
`;

const Title = styled(motion.h2)`
  color: white;
  margin-bottom: 20px;
`;

const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
`;

const PhoneContainerRegister = styled.div`
    gap: 5px;
    display: grid;
    grid-template-columns: 1fr 5fr;
    justify-content: center;
    margin-bottom: 10px;
`;


const PhoneInput = styled(Input)`
    min-width: 50px;
    padding: 5px;
    text-align: center;
    background: #333 !important;
    color: white !important;
    border: none !important;
    outline: none !important;

    &::placeholder {
        color: #504d4d;
    }
`;

const Dash = styled.span`
  color: white;
  font-size: 18px;
`;

const MotionInput = styled(motion.input)`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background: #333;
  color: white;
  font-size: 16px;
  outline: none;
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #ff4757;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const RegisterText = styled.p`
  color: white;
  margin-top: 15px;
  font-size: 14px;
  & .link {
    color: #ff4757;
    text-decoration: none;
  }
`;