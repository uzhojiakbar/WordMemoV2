import styled from "styled-components";

export const HomePageContainer = styled.div`
    height: 100vh;
    background: #121212;
    border-radius: 12px;
    width: 100vw;
    text-align: center;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    font-size: 22px;
    margin: 0 auto;
`

export const DayCardWrapper = styled.div`
    padding: 20px;
    overflow-x: auto;
    display: flex;
    gap: 20px;
    scroll-behavior: smooth;

    /* Scrollbar styling */
    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.1); /* Yashil fon bilan uyg‘un */
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.2); /* Yashil fon bilan uyg‘un */
    }

    .active{
        background: #333  !important; /* Hoverda to‘liq yashil */
        border-color: #333 !important;;
        color: white;
        transform: scale(1.05) !important;;
    }
`;

export const DayCard = styled.div`
    background: #1e1e1e;
    border: 2px solid #1e1e1e; /* Yorqin yashil chegara */
    color: white;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2); /* Yashil soyali effekt */
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    height: 100px;
    min-width: 100px; /* Kartalar bir xil bo‘lishi uchun */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    user-select: none;

    &:hover {
        //background: #4CAF50; /* Hoverda to‘liq yashil */
        //border-color: #81C784;
        //transform: scale(1.05);
        background: #333  !important; /* Hoverda to‘liq yashil */
        border-color: #333 !important;;
        color: white;
        transform: scale(1.05) !important;;
    }
    
   cursor: pointer;
`;
