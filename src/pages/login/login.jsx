import React, {useState, useRef} from "react";
import {motion} from "framer-motion";
import styled from "styled-components";
import {Input} from "antd";
import {useLogin, useRegister} from "../../utils/server.js";
import {useToast} from "../../hooks/useToast.jsx";
import {Loader} from "../../router/router.jsx";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [phoneParts, setPhoneParts] = useState(["+998", "", "", "", ""]);
    const [registerInfo, setRegisterInfo] = useState({
        fullname: "",
        phonenumber: "",
        password: "",
        repassword: "",
    });
    const [password, setPassword] = useState("");
    const [page, setPage] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
    const [loading, setLoading] = useState(0);

    const inputPlaceholder = ["+998", "97", "822", "24", "27"]

    const mutation = useLogin()
    const mutationRegister = useRegister()
    const nav = useNavigate();


    const handelChangeInput = (name, value) => {
        setRegisterInfo({
            ...registerInfo,
            [name]: value
        })
    }


    const handleSubmit = (event) => {
        if (event) event.preventDefault(); // Sahifa refresh bo‘lishining oldini olamiz

        setLoading(1);

        if (!phoneParts.join("") || !/^\+998\d{9}$/.test(phoneParts.join(""))) {
            setLoading(0);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useToast("err", "Telefon raqam noto‘g‘ri formatda");
            throw new Error("Telefon raqam noto‘g‘ri formatda");
            return
        }


        if (password.length < 1) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useToast("err", "Parolingizni kiriting")
            setLoading(0);
            return
        }

        console.log(phoneParts.join(""));

        const request = {
            phonenumber: phoneParts.join(""),
            password
        }

        mutation.mutate({
            requestData: request, onSuccess: (data) => {
                console.log(data)
                setTimeout(() => {
                    setLoading(false);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useToast("ok", "Hisobga kirdingiz");
                    setTimeout(() => {
                        nav("/")
                        document.location.reload();
                    }, 300)
                }, 500);
            }, onError: (err) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useToast("err", err?.response?.data?.error || "Nomalum xatolik");
                console.log(err)
                setLoading(false);
            },
        });

    };


    const handelRegister = (event) => {
        if (event) event.preventDefault(); // Sahifa refresh bo‘lishining oldini olamiz

        setLoading(1);

        if (!registerInfo.fullname) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useToast("err", "To'liq ism familiyangizni kiriting.")
            setLoading(0);
            return
        }

        if (!registerInfo.phonenumber || !/^\+998\d{9}$/.test("+998"+registerInfo.phonenumber)) {
            setLoading(0);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useToast("err", "Telefon raqam noto‘g‘ri formatda");
            throw new Error("Telefon raqam noto‘g‘ri formatda");
            return
        }


        if (registerInfo.password !== registerInfo?.repassword) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useToast("err", "Parollar bir xil emas.")
            setLoading(0);
            return
        }

        if (registerInfo.password < 6) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useToast("err", "Parolning minimal uzunligi 6 ta.")
            setLoading(0);
            return
        }

        const request = {
            fullname: registerInfo.fullname,
            phonenumber: `+998${registerInfo.phonenumber}`,
            password: registerInfo.password,
        }

        mutationRegister.mutate({
            requestData: request, onSuccess: (data) => {
                console.log(data)
                setTimeout(() => {
                    setLoading(false);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useToast("ok", "Ro'yxatdan o'tdingiz");
                    setTimeout(() => {
                        setPage("login");
                    }, 300)
                }, 500);
            }, onError: (err) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useToast("err", err?.response?.data?.error || "Nomalum xatolik");
                console.log(err)
                setLoading(false);
            },
        });
    }


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
            <Container initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.8}}>
                {
                    loading ? <Loader/> : ""
                }
                <Form onSubmit={handelRegister} initial={{y: 50}} animate={{y: 0}}
                      transition={{type: "spring", stiffness: 100}}>
                    <Title>Ro‘yxatdan o‘tish</Title>
                    <MotionInput
                        placeholder="To‘liq ism va familiya"
                        value={registerInfo.fullname}
                        onChange={(e) => handelChangeInput("fullname", e.target.value)}
                    />
                    <PhoneContainerRegister>
                        <PhoneInput value={phoneParts[0]} disabled/>
                        <PhoneInput placeholder={"978222427"}
                                    value={registerInfo.phonenumber}
                                    onChange={(e) => handelChangeInput("phonenumber", `${e.target.value}`)}
                        />
                    </PhoneContainerRegister>
                    <PasswordContainer>
                        {
                            showPassword ? <MotionInput
                                type="text"
                                placeholder="Parol"
                                value={registerInfo.password}
                                onChange={(e) => handelChangeInput("password", `${e.target.value}`)}
                            /> : <MotionInput
                                type="password"
                                placeholder="Parol"
                                value={registerInfo.password}
                                onChange={(e) => handelChangeInput("password", `${e.target.value}`)}
                            />
                        }
                        {
                            showPassword ?
                                <i
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="fa-solid fa-lock eye"></i>
                                :
                                <i
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="fa-solid fa-lock-open eye"></i>
                        }
                    </PasswordContainer>
                    {
                        showPassword ?  <MotionInput
                            type="text"
                            placeholder="Parolni takrorlang"
                            value={registerInfo.repassword}
                            onChange={(e) => handelChangeInput("repassword", `${e.target.value}`)}
                        /> :  <MotionInput
                            type="password"
                            placeholder="Parolni takrorlang"
                            value={registerInfo.repassword}
                            onChange={(e) => handelChangeInput("repassword", `${e.target.value}`)}
                        />
                    }
                    <Button
                        type="submit"
                        whileTap={{scale: 0.9}}>Ro‘yxatdan o‘tish</Button>
                    <RegisterText>Allaqachon hisobingiz bormi? <span onClick={() => setPage("login")}
                                                                     className={"link"}>Kirish</span></RegisterText>
                </Form>
            </Container>
        );
    }


    return (
        <Container initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.8}}>

            {
                loading ? <Loader/> : ""
            }
            <Form onSubmit={handleSubmit} initial={{y: 50}} animate={{y: 0}}
                  transition={{type: "spring", stiffness: 100}}>
                <Title initial={{scale: 0.8}} animate={{scale: 1}} transition={{duration: 0.5}}>Hisobingizga
                    kirish.</Title>
                <PhoneContainer>
                    <PhoneInput value={phoneParts[0]} disabled/>
                    {phoneParts.slice(1).map((part, index) => (
                        <React.Fragment key={index}>
                            <PhoneInput
                                ref={inputRefs[index + 1]}
                                placeholder={inputPlaceholder[index + 1]}
                                value={part}
                                onChange={(e) => handlePhoneChange(index + 1, e.target.value)}
                            />
                        </React.Fragment>
                    ))}
                </PhoneContainer>
                <PasswordContainer>
                    {
                        showPassword ? <MotionInput
                                style={{width: '100%'}}
                                type="text"
                                placeholder="Parolingizni kiriting"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.8}}
                            />
                            :
                            <MotionInput
                                style={{width: '100%'}}
                                type="password"
                                placeholder="Parolingizni kiriting"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.8}}
                            />
                    }
                    {
                        showPassword ?
                            <i
                                onClick={() => setShowPassword(!showPassword)}
                                className="fa-solid fa-lock eye"></i>
                            :
                            <i
                                onClick={() => setShowPassword(!showPassword)}
                                className="fa-solid fa-lock-open eye"></i>
                    }
                </PasswordContainer>

                <Button type={"submit"} whileTap={{scale: 0.9}}>Login</Button>
                <RegisterText> Sizda hisob yo‘qmi? <span onClick={() => setPage("register")} className={"link"}> Ro‘yxatdan o‘ting</span>
                </RegisterText>
            </Form>
        </Container>
    );
};

export default Login;


const Title = styled(motion.h2)`
    color: white;
    margin-bottom: 20px;
`;
const Container = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #121212;
    padding: 20px; // Kichik ekranda chetga yopishib qolmasin
`;

const Form = styled(motion.form)`
    background: #1e1e1e;
    padding: 30px;
    border-radius: 12px;
    width: 100%;
    max-width: 450px;
    text-align: center;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 768px) {
        max-width: 500px;
    }

    @media (min-width: 1024px) {
        max-width: 600px;
        padding: 40px;
    }
`;

const PhoneContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 8px;
    justify-content: center;
    margin-bottom: 15px;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        gap: 12px;
    }

    @media (min-width: 1024px) {
        gap: 15px;
    }
`;

const PhoneContainerRegister = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 10px;
    justify-content: center;
    margin-bottom: 15px;

    > input {
        text-align: left;
    }

    @media (min-width: 768px) {
        grid-template-columns: 1fr 3fr;
    }
`;

const PhoneInput = styled(Input)`
    min-width: 50px;
    padding: 8px;
    text-align: center;
    background: #333 !important;
    color: white !important;
    border: none !important;
    outline: none !important;

    &::placeholder {
        color: #756c6c;
    }

    @media (min-width: 1024px) {
        min-width: 60px;
        padding: 10px;
    }
`;

const MotionInput = styled(motion.input)`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: none;
    border-radius: 6px;
    background: #333;
    color: white;
    font-size: 16px;
    outline: none;
    padding-right: 50px;

    @media (min-width: 1024px) {
        padding: 14px;
        font-size: 18px;
    }
`;

const Button = styled(motion.button)`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background: #ff4757;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background: #ff6b81;
    }

    @media (min-width: 1024px) {
        font-size: 18px;
        padding: 14px;
    }
`;

const RegisterText = styled.p`
    color: white;
    margin-top: 15px;
    font-size: 14px;

    & .link {
        color: #ff4757;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            color: #98343a;
        }
    }

    @media (min-width: 1024px) {
        font-size: 16px;
    }
`;

const PasswordContainer = styled(motion.div)`
    position: relative;

    .eye {
        position: absolute;
        top: 20px;
        right: 20px;
        //color: #ff4757;
        color: #756c6c;
    }
`