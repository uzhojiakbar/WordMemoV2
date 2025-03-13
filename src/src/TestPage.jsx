import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Button, Input, Card, List, message} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons"; // Ikonalar uchun

function TestPage() {
    const {date: dateInner, type} = useParams();
    const navigate = useNavigate();
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [results, setResults] = useState([]);
    const [date, setDate] = useState("");
    const [showCorrectWord, setShowCorrectWord] = useState(false);

    useEffect(() => {
        if (!date?.length) {
            const [month, day, year] = dateInner.split('-');
            setDate(`${month}/${day}/${year}`);
        }
    }, [dateInner]);

    useEffect(() => {
        const storedWords = JSON.parse(localStorage.getItem("dailyWords")) || [];
        const selectedDay = storedWords.find((item) => item.date === date);
        if (selectedDay) {
            setWords(selectedDay.words.sort(() => Math.random() - 0.5));
        }
    }, [date]);

    const checkAnswer = () => {
        const correct = type === "uzbek"
            ? words[currentIndex].english
            : words[currentIndex].uzbek;

        if (answer?.toLowerCase() === correct?.toLowerCase()) {
            setResults(prevResults => [
                ...prevResults,
                {word: words[currentIndex], correct: true}
            ]);
            setAnswer("");
            message.success("TO'G'RI", 1);
            if (currentIndex + 1 < words.length) {
                setCurrentIndex(currentIndex + 1);
            }
        } else {
            setResults(prevResults => [
                ...prevResults,
                {word: words[currentIndex], correct: false}
            ]);
            setAnswer("");  // Javobni tozalash
            message.error("NOTO'G'RI", 1);
        }
    };

    return (
        <Card
            title={`Test: ${date} (${type})`}
            style={{maxWidth: "450px", margin: "auto", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
            bodyStyle={{padding: "10px"}}
        >
            {currentIndex < words.length ? (
                <>
                    <h3
                        style={{color: results[currentIndex]?.correct === false ? "red" : "#000", fontWeight: "bold", textAlign: "center"}}
                    >
                        {type === "uzbek" ? words[currentIndex].uzbek : words[currentIndex].english}
                    </h3>
                    <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        style={{marginBottom: "20px"}}
                        placeholder="Javobni kiriting..."
                    />
                    <Button
                        onClick={checkAnswer}
                        type="primary"
                        block
                        style={{marginBottom: "10px", borderRadius: "8px"}}
                    >
                        Tekshirish
                    </Button>

                    {results[currentIndex]?.correct === false && (
                        <Button
                            onClick={() => setShowCorrectWord(!showCorrectWord)}
                            block
                            style={{borderRadius: "8px", marginBottom: "10px", backgroundColor: "#f0f0f0"}}
                        >
                            Tog'ri so'zni ko'rish
                        </Button>
                    )}

                    {showCorrectWord && (
                        <p style={{color: "green", fontWeight: "bold", textAlign: "center"}}>
                            Tog'ri javob: {type === "uzbek" ? words[currentIndex].english : words[currentIndex].uzbek}
                        </p>
                    )}
                </>
            ) : (
                <List
                    dataSource={results}
                    renderItem={(res) => (
                        <List.Item
                            style={{
                                color: res.correct ? "green" : "red",
                                fontWeight: "bold",
                                textAlign: "center",
                                borderBottom: "1px solid #ddd",
                                padding: "10px 0"
                            }}
                        >
                            {res.word.english} - {res.word.uzbek}
                            {res.correct ? <CheckCircleOutlined style={{color: "green", marginLeft: "10px"}} /> : <CloseCircleOutlined style={{color: "red", marginLeft: "10px"}} />}
                        </List.Item>
                    )}
                />
            )}
            <Button
                onClick={() => navigate("/")}
                block
                style={{borderRadius: "8px", backgroundColor: "#f0f0f0", marginTop: "20px"}}
            >
                Ortga qaytish
            </Button>
        </Card>
    );
}

export default TestPage;
