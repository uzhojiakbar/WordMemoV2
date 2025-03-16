import styled from "styled-components";
import { motion } from "framer-motion";
import {Input} from "antd"

export const Container = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #121212;
`;

export const Form = styled(motion.div)`
    background: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;
export const Title = styled.h2`
    color: white;
    margin-bottom: 20px;
`;

export const PhoneContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-bottom: 10px;
`;

export const PhoneInput = styled(Input)`
    width: 50px;
    text-align: center;
    background: #333 !important;
    color: white !important;
    border: none !important;
    outline: none !important;
`;

export const Dash = styled.span`
    color: white;
    font-size: 18px;
`;

export  const Button = styled(motion.button)`
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

export  const RegisterText = styled.p`
  color: white;
  margin-top: 15px;
  font-size: 14px;
  & a {
    color: #ff4757;
    text-decoration: none;
  }
`;

export const InputAntd = styled(Input)`
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
