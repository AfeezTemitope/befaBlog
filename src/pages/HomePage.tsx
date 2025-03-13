import Footer from "../components/Footer.tsx";
import React from "react";
import Header from "../components/Header.tsx";
import NewsBlog from "../components/NewsBlog.tsx";
import PlayerOfTheMonth from "../components/PlayerOfTheMonth.tsx";
import TrainingSchedule from "../components/TrainingSchedule.tsx";
import ClubAnnouncement from "../components/ClubAnnouncement.tsx";

const HomePage: React.FC = () => {
    return(
        <div>
            <Header/>
            <TrainingSchedule/>
            <PlayerOfTheMonth/>
            <ClubAnnouncement/>
            <NewsBlog/>
            <Footer/>
        </div>
    )
}

export default HomePage
