import React from 'react'
import icon1 from "../../../assets/images/frame-51-6yw.png"
import icon2 from "../../../assets/images/frame-50-9eR.png"
import icon3 from "../../../assets/images/frame-63-9Vs.png"

const About = () => {
  return (
    <div class="container-fluid about-container">
        <div class="container py-5">
            <div class="row">
                <div class="col-lg-7">
                    <p class="about-heading text-start">Get all the data you need from the most reliable sources.</p>
                </div>
                <div class="col-lg-5"></div>
            </div>
            <div class="row py-5">
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-3">
                            <div class="about-icon-container">
                                <img class="about-icon" src={icon1} alt="icon"/>
                            </div>
                        </div>
                        <div class="col-9">
                            <p class="about-card-title">
                                Download anywhere
                            </p>
                            <p class="about-card-text">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitatio
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-3">
                            <div class="about-icon-container">
                                <img class="about-icon" alt="icon" src={icon2} />
                            </div>
                        </div>
                        <div class="col-9">
                            <p class="about-card-title">
                                Download anywhere
                            </p>
                            <p class="about-card-text">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitatio
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-3">
                            <div class="about-icon-container">
                                <img class="about-icon" src={icon3}  alt="icon"/>
                            </div>
                        </div>
                        <div class="col-9">
                            <p class="about-card-title">
                                Download anywhere
                            </p>
                            <p class="about-card-text">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim velit mollit. Exercitatio
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
