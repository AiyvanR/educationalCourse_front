import React from "react";
import MainHeader from "../layout/MainHeader.jsx";
import PortalService from "../common/PortalService.jsx";
import Parallax from "../common/Parallax.jsx";
import CourseSlider from "../common/CourseSlider.jsx";


const Home = () => {
    return (
        <section>
            <MainHeader/>

            <section className="container">
                <CourseSlider/>
                <Parallax/>
                <PortalService/>
                <Parallax/>
                <CourseSlider/>

            </section>

        </section>
    )
}

export default Home