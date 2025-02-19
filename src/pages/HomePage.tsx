import Footer from "../components/Footer.tsx";
import React from "react";
import Header from "../components/Header.tsx";
import NewsBlog from "../components/NewsBlog.tsx";
import PlayerOfTheMonth from "../components/PlayerOfTheMonth.tsx";
import TrainingSchedule from "../components/TrainingSchedule.tsx";

const HomePage: React.FC = () => {
    return(
        <div>
            <Header/>
            <TrainingSchedule/>
            <PlayerOfTheMonth/>
            <NewsBlog/>
            <Footer/>
        </div>
    )
}

export default HomePage
