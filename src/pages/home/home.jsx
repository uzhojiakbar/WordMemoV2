import React, {useEffect, useState} from 'react';
import {DayCard, DayCardWrapper, HomePageContainer} from "./style.js";
import {GetWords} from "../../utils/server.js";
import {Loader} from "../../router/router.jsx";


const HomePage = () => {

    const {data: words, isLoading} = GetWords()
    console.log("WORDS", words)

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // "YYYY-MM-DD" formatida
    };

    const [dates, setDates] = useState([]);
    const [currentData, setCurrentData] = useState(getCurrentDate());
    console.log(currentData);
    console.log(dates);


    const getUniqueDates = (words) => {
        const uniqueDates = [...new Set(words?.map(word => word.date))];
        setDates(uniqueDates);
        return uniqueDates;
    };


    // sanalarni olish
    useEffect(() => {
        getUniqueDates(words)
    }, [words])

    console.log(dates)

    const formatDate = (dateString) => {
        const months = [
            "yanvar", "fevral", "mart", "aprel", "may", "iyun",
            "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}-${month}, ${year}`;
    };


    return <HomePageContainer>
        {isLoading ? <Loader/> : null}
        <DayCardWrapper>
        {
            dates?.reverse()?.map((v) => {
                console.log(v==currentData)
                console.log(currentData)
                console.log(v)
                return <DayCard
                    onClick={()=>currentData!==v ? setCurrentData(v) : {}}
                    className={v==currentData?"active":""}
                > {formatDate(v)} </DayCard>
            })
        }
        </DayCardWrapper>
    </HomePageContainer>
}

export default HomePage;