import {useState, useEffect, useRef} from "react";
import { Input, Button, List, Card, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "./maintest.css"

function App() {
    const navigate = useNavigate();
    const [english, setEnglish] = useState("");
    const [uzbek, setUzbek] = useState("");
    const [words, setWords] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dates, setDates] = useState([]);
    const [visibleCount, setVisibleCount] = useState(7);
    const scrollContainerRef = useRef(null);


    useEffect(() => {
        const storedWords = JSON.parse(localStorage.getItem("dailyWords")) || [];
        setWords(storedWords);

        const today = new Date();
        let generatedDates = [];
        for (let i = 29; i >= 0; i--) {
            let date = new Date();
            date.setDate(today.getDate() - i);
            generatedDates.push(date.toLocaleDateString());
        }
        setDates(generatedDates.reverse());

        if (storedWords.length > 0) {
            setSelectedDate(storedWords[storedWords.length - 1].date);
        }

        // Scrollni oxiriga olib borish
    }, []);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    },[dates])




    const addWord = () => {
        if (english.trim() && uzbek.trim()) {
            const today = new Date().toLocaleDateString();
            let updatedWords = [...words];

            const existingDateIndex = updatedWords.findIndex((item) => item.date === today);

            if (existingDateIndex !== -1) {
                updatedWords[existingDateIndex].words.push({ english, uzbek });
            } else {
                updatedWords.push({
                    id: Date.now(),
                    date: today,
                    words: [{ english, uzbek }],
                });
            }

            setWords(updatedWords);
            localStorage.setItem("dailyWords", JSON.stringify(updatedWords));
            setEnglish("");
            setUzbek("");
            setIsModalOpen(false);
            setSelectedDate(today);
        }
    };

    const loadMoreDates = () => {
        setVisibleCount((prev) => prev + 7);
    };

    function convertDateToDashFormat(date) {
        const [month, day, year] = date.split('/');
        return `${month}-${day}-${year}`;
    }

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <Card title="Kunlik so‘zlar" bordered={false}>
                <Button type="primary" onClick={() => setIsModalOpen(true)} block>
                    So‘z qo‘shish
                </Button>
            </Card>

            {/* Kunlar tugmalari */}
            <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
                <div style={{ overflowX: "auto", whiteSpace: "nowrap", marginTop: "20px", paddingBottom: "10px" }} ref={scrollContainerRef}>
                    <Space style={{ paddingTop: "20px", flexDirection: "row-reverse" }}>
                        {dates.slice(0, visibleCount).map((date, index) => (
                            <Button
                                key={index}
                                type={selectedDate === date ? "primary" : "default"}
                                shape="round"
                                className={"bageBTN"}
                                onClick={() => setSelectedDate(date)}
                            >
                                {date}
                            </Button>
                        ))}
                        <Button type="dashed" onClick={loadMoreDates}>⏪</Button>
                    </Space>
                </div>
            </div>

            {/* Test boshlash tugmalari */}
            <div style={{ marginTop: "10px" }}>
                <Button
                    type="primary"
                    block
                    onClick={() => navigate(`/test/${convertDateToDashFormat(selectedDate)}/uzbek`)}
                >
                    O‘zbekcha Testni Boshlash
                </Button>
                <Button
                    type="default"
                    block
                    style={{ marginTop: "5px" }}
                    onClick={() => navigate(`/test/${convertDateToDashFormat(selectedDate)}/english`)}
                >
                    Inglizcha Testni Boshlash
                </Button>
            </div>

            {/* Tanlangan kunning so‘zlari */}
            <List
                style={{ marginTop: "20px" }}
                bordered
                dataSource={words.find((item) => item.date === selectedDate)?.words || []}
                renderItem={(word) => (
                    <List.Item>
                        {word.english} - {word.uzbek}
                    </List.Item>
                )}
            />

            {/* Modal oynasi */}
            <Modal
                title="Yangi so‘z qo‘shish"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Bekor qilish
                    </Button>,
                    <Button key="add" type="primary" onClick={addWord}>
                        Qo‘shish
                    </Button>,
                ]}
            >
                <Input
                    placeholder="English word"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    style={{ marginBottom: "10px" }}
                />
                <Input
                    placeholder="O‘zbekcha tarjima"
                    value={uzbek}
                    onChange={(e) => setUzbek(e.target.value)}
                />
            </Modal>
        </div>
    );
}

export default App;
