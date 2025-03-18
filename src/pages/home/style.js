import styled from "styled-components";
import {Button, Form, Input, Modal} from "antd";

export const HomePageContainer = styled.div`
    min-height: 100vh;
    background: #121212;
    border-radius: 12px;
    max-width: 1200px;
    text-align: center;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
    
    font-size: 22px;
    margin: 0 auto;
    padding: 20px;
    color: #e0e0e0;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    
    
    position: relative;
`;

export const DayCardWrapper = styled.div`
    overflow-x: auto;
    display: flex;
    scroll-behavior: smooth;
    flex-direction: row;
    padding: 10px 0;

    /* Scrollbar styling */
    &::-webkit-scrollbar {
        height: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.3);
    }

    .active {
        background: #333 !important;
        border-color: #333 !important;
        color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
`;

export const DayCard = styled.div`
    background: #1e1e1e;
    border: 2px solid #1e1e1e;
    color: white;
    padding: 15px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    height: 150px;
    min-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    user-select: none;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    margin: 5px;

    &:hover {
        background: #333 !important;
        border-color: #333 !important;
        color: white;
        transform: scale(1.05);
    }

    cursor: pointer;
`;
export const WordWrapper = styled.div`
    background: #1e1e1e; /* Dark mode uchun to‘g‘ri rang */
    user-select: none;
    border-radius: 20px;
    margin: 0 auto;
    height: 50vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 25px;
    box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.1);
    border: 2px solid #333;
`;

export const WordNavbar = styled.div`
    display: flex;
    justify-content: space-between; /* O‘ng tarafga emas, ikkala tomonga */
    align-items: center;
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    border-bottom: 2px solid #333;
`;

export const WordFooter = styled.div`
    display: flex;
    justify-content: center; /* O‘ng emas, o‘rtaga qo‘ydik */
    align-items: center;
    width: 100%;
    height: 70px;

    .nextWord {
        color: #fff;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
            color: #4CAF50; /* Yashil rang - hover effekti */
        }
    }
`;

export const Word = styled.div`
    height: 100%;
    display: flex;
    user-select: none;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    padding: 10px 20px;
    background: ${({bg})=>bg?"#343232":"#292929"};
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

   
`;


export const ButtonWrapper = styled.div`
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    border-radius: 15px;
    padding: 10px;
`;

export const AddButton = styled.button`
    width:  100%;
    height: 50px;
    padding: 15px;
    outline: none;
    background: ${({color})=>color=="yellow"?"#f1da14":"#3e8e41"};
    border: none;
    color:  ${({color})=>color=="yellow"?"#343232":"#fff"};
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    

    &:active {
        transform: scale(0.95);
        box-shadow: 0 2px 5px rgba(0, 255, 100, 0.3);
    }
`;


export const StyledModal = styled(Modal)`
    .ant-modal-content {
        background: #1e1e1e;
        color: #fff;
        height: 80vh;
        

        border-radius: 12px;
    }

    .ant-modal-header {
        background: #1e1e1e;
        color: #fff;
        border-bottom: 2px solid #333;
    }

    .ant-modal-title {
        color: #fff;
    }

    .ant-modal-close {
        color: #fff;
    }

    .ant-modal-footer {
        border-top: none;
    }
    
    .title{
        color: #fff;
    }
    
    height: 80vh;
    
`;


export const StyledFormItem = styled(Form.Item)`
  label {
    color: #fff !important;
    font-weight: bold;
    font-size: 16px;
  }
  
  .ant-form-item-label > label {
    color: #fff !important;
  }
  
  .ant-form-item-control {
    background: #292929 !important;
    border-radius: 8px;
  }
`;


export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
`

// Inputlar uchun stil
export const StyledInput = styled(Input)`
    background: #292929;
    border: 1px solid #444;
    color: #fff;

    &::placeholder {
        color: #aaa;
    }


    &:hover {
        background: #292929;
        border: 1px solid #444;
        color: #fff;
    }
    &:focus {
        background: #292929;
        border: 1px solid #444;
        color: #fff;
    }
`;

// Tugma uchun stil
export const StyledButton = styled.button`
    background: #3e8e41;
    color: #fff;
    font-weight: bold;
    border: none;
    transition: 0.3s;

    padding: 10px 25px;
    cursor: pointer;
    border-radius: 5px;
    

    &:hover {
        background: #45a049;
    }

    &:active {
        background: #3e8e41;
        transform: scale(0.95);
    }
`;
