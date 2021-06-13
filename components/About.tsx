import React from "react";

export const About = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Get in touch");
  };

  return (
    <section className="about" id="about">
      <div
        className="about__shell"
        style={{ backgroundImage: "url(img/pirja4ko-temp.png)" }}
      >
        <div className="about__layer">
          <div className="about__title">
            <span>WILD </span>CAPTURE{" "}
          </div>
          <div className="about__text">
            <span>
              A-to-Z Consulting Solutions for Virtual Production, XR and VFX
            </span>
            <span>
              Functional Volumetric Video Assets Optimized for Any Delivery
            </span>
            <span>Advanced Performance Capture Machine Learning Workflows</span>
          </div>
          <form
            className="about__button-container"
            method="LINK"
            action="/#contact"
          >
            <button className="button about__button" onSubmit={handleSubmit}>
              Get in touch
            </button>
          </form>
        </div>
        <div className="about__logo">
          <img src={"../img/about-main-image.svg"} />
        </div>
      </div>
    </section>
  );
};
