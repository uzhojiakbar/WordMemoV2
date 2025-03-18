import React, {useState} from 'react';
import {Modal, Input, Button} from 'antd';
import {ModalContainer, StyledFormItem, StyledInput, StyledModal} from "./style.js";

const WordCheckModal = ({visible, onClose, words = []}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleCheck = () => {
        if (userInput.trim().toLowerCase() === words[currentIndex].eng.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setIsChecked(true);
    };

    const handleNext = () => {
        setUserInput('');
        setIsChecked(false);
        setIsCorrect(null);
        if (currentIndex + 1 < words.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0)
        }
    };

    return (
        <StyledModal title="So'zlarni tekshirish" open={visible} onCancel={onClose} footer={null}>
            <ModalContainer>

                <p>So'zning tarjimasini yozing: {words[currentIndex]?.uz}</p>
                <StyledInput
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Inglizcha so'zni kiriting"
                />
                {isChecked && (
                    <p style={{color: isCorrect ? 'green' : 'red'}}>
                        {isCorrect ? `To‘g‘ri! ${words[currentIndex]?.eng} ` : `Noto‘g‘ri!`}
                    </p>
                )}
                <div style={{marginTop: 10}}>
                    {!isChecked || !isCorrect ? (
                        <div style={{"display": "flex", "gap": "10px"}}>
                            <Button type="primary" onClick={handleCheck}>
                                Tekshirish
                            </Button>
                            <Button type="primary" onClick={() => {
                                setIsChecked(true);
                                setIsCorrect(true);
                            }}>
                                Togri sozni korish
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={handleNext}>
                            Keyingi so‘z
                        </Button>
                    )}
                </div>
            </ModalContainer>

        </StyledModal>
    );
};

export default WordCheckModal;
