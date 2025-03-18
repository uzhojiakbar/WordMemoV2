import React, {useEffect, useState} from 'react';
import {
    AddButton, ButtonWrapper,
    DayCard,
    DayCardWrapper,
    HomePageContainer, StyledButton, StyledForm, StyledFormItem, StyledInput, StyledModal,
    Word,
    WordFooter,
    WordNavbar,
    WordWrapper
} from "./style.js";
import {GetWords, GetWordsFilter, useAddWord} from "../../utils/server.js";
import {Loader} from "../../router/router.jsx";
import {Modal, Input, Form, Button} from 'antd';
import {useToast} from "../../hooks/useToast.jsx";
import WordCheckModal from "./TestChecker.jsx";

const HomePage = () => {
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    const [currentData, setCurrentData] = useState(getCurrentDate());
    const {data: wordsFilter, isLoading: wordsFilterLoad} = GetWordsFilter({date: currentData});
    const {data: words, isLoading} = GetWords();

    const [shuffledWords, setShuffledWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(0);
    const [showTranslate, setShowTranslate] = useState(false);
    const [seenWords, setSeenWords] = useState(new Set());
    const [dates, setDates] = useState([]);

    const [loading, setLoading] = useState(false);

    // Modal holati
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenTest, setIIsModalOpenTest] = useState(false);
    const [newWord, setNewWord] = useState({eng: '', uz: ''});

    // So‘zlarni random qilish
    useEffect(() => {
        if (wordsFilter) {
            let shuffled = [...wordsFilter].sort(() => Math.random() - 0.5);
            setShuffledWords(shuffled);
        }
    }, [wordsFilter]);

    // Unikal sanalarni olish
    useEffect(() => {
        if (words?.length) {
            const currentDate = getCurrentDate();
            const uniqueDates = new Set(words.map(word => word.date));

            if (!uniqueDates.has(currentDate)) {
                uniqueDates.add(currentDate);
            }

            setDates([...uniqueDates]);
        } else {
            setDates([getCurrentDate()]);

        }
    }, [words]);


    useEffect(() => {
        setCurrentWord(0);
    }, [currentData]);

    const formatDate = (dateString) => {
        const months = [
            "yanvar", "fevral", "mart", "aprel", "may", "iyun",
            "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"
        ];
        const date = new Date(dateString);
        return `${date.getDate()}-${months[date.getMonth()]}, ${date.getFullYear()}`;
    };

    const handleDoubleClick = () => {
        setShowTranslate(!showTranslate);

        if (showTranslate && !seenWords.has(currentWord)) {
            setSeenWords(prev => new Set([...prev, currentWord]));

            let newWords = [...shuffledWords];
            let wordToMove = newWords[currentWord];

            if (currentWord + 3 < newWords.length) {
                newWords.splice(currentWord, 1);
                newWords.splice(currentWord + 3, 0, wordToMove);
            }

            setShuffledWords(newWords);
        }
    };

    const handleNextWord = () => {
        if (shuffledWords[currentWord + 1]) {
            setShowTranslate(false);
            setCurrentWord(currentWord + 1);
        } else {
            setCurrentWord(0);
            setShowTranslate(false);
        }
    };

    // Modal ochish
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalshowModalTest = () => {
        setIIsModalOpenTest(true);
    };

    // Modal yopish
    const handleCancel = () => {
        setIsModalOpen(false);
        setNewWord({eng: '', uz: ''});
    };

    // Modal yopish
    const handleCancelTest = () => {
        setIIsModalOpenTest(false);
    };

    const mutation = useAddWord()
    // Yangi so‘z qo‘shish
    const handleAddWord = () => {
        if (newWord.eng.trim() && newWord.uz.trim()) {
            const request = {
                "eng": newWord.eng.trim(),
                "uz": newWord.uz.trim(),
                "date": currentData,
            }
            mutation.mutate({
                requestData: request, onSuccess: (data) => {
                    console.log(data)
                    setTimeout(() => {
                        setLoading(false);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useToast("ok", "So'z Qo'shildi.");
                    }, 500);
                }, onError: (err) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useToast("err", err?.response?.data?.error || "Nomalum xatolik");
                    console.log(err)
                    setLoading(false);
                },
            });

            setIsModalOpen(false);
            handleCancel()
            setNewWord({eng: '', uz: ''});
        }
    };

    return (
        <HomePageContainer>
            {wordsFilterLoad || loading || isLoading ? <Loader/> : ""}
            <DayCardWrapper>
                {dates?.map((v, index) => (
                    <DayCard
                        key={index}
                        onClick={() => currentData !== v && setCurrentData(v)}
                        className={v === currentData ? "active" : ""}
                    >
                        {formatDate(v)}
                    </DayCard>
                ))}
            </DayCardWrapper>

            {
                shuffledWords?.length > 0 ?
                    <WordWrapper>
                        <WordNavbar>
                            <div>{currentWord + 1} / {shuffledWords?.length}</div>
                        </WordNavbar>

                        <Word bg={showTranslate} onDoubleClick={handleDoubleClick}>
                            {showTranslate ? shuffledWords?.[currentWord]?.uz : shuffledWords?.[currentWord]?.eng}
                        </Word>

                        <WordFooter onClick={handleNextWord}>
                            <div className="nextWord">Keyingi so'z</div>
                        </WordFooter>
                    </WordWrapper>
                    :
                    <WordWrapper>
                        <WordNavbar>

                        </WordNavbar>

                        <Word onDoubleClick={handleDoubleClick}>
                            Hozircha so'zlar yo'q
                        </Word>

                        <WordFooter onClick={handleNextWord}>

                        </WordFooter>
                    </WordWrapper>

            }

            <ButtonWrapper>
                {
                    wordsFilter?.length > 0 ?
                        <AddButton color={"yellow"} onClick={showModalshowModalTest}>
                            <i className="fa-solid fa-plus"></i>
                            Testni boshlash
                        </AddButton>
                        : ""
                }
                <AddButton onClick={showModal}>
                    <i className="fa-solid fa-plus"></i>
                    So'z qo'shish
                </AddButton>
            </ButtonWrapper>

            <WordCheckModal visible={isModalOpenTest} onClose={handleCancelTest} words={wordsFilter}/>

            <StyledModal title="Yangi so'z qo'shish" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <StyledForm layout="vertical">
                    <StyledFormItem style={{"color": "white !important"}} className={"title"} label="Inglizcha so'z">
                        <StyledInput
                            value={newWord.eng}
                            onChange={(e) => setNewWord({...newWord, eng: e.target.value})}
                            placeholder="Masalan: Apple"
                        />
                    </StyledFormItem>
                    <StyledFormItem label="O'zbekcha tarjima">
                        <StyledInput
                            value={newWord.uz}
                            onChange={(e) => setNewWord({...newWord, uz: e.target.value})}
                            placeholder="Masalan: Olma"
                        />
                    </StyledFormItem>
                    <Form.Item>
                        <StyledButton type="primary" onClick={handleAddWord}>
                            Qo'shish
                        </StyledButton>
                    </Form.Item>
                </StyledForm>
            </StyledModal>
        </HomePageContainer>
    );
};

export default HomePage;
