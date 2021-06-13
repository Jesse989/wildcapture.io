import React, { Fragment, useState } from 'react';

export const Work = () => {
    const [isMoreWorks, setIsMoreWorks] = useState(false);

    const workVideos = {
        CohortCrowdSystem: 'work-video-item.png',
        Action Demo: 'work-video-kfu.png',
        Universal Volumetric: 'work-video-drac.png',
        Chakra: 'work-video-yoga.png',
    }



    return (
        <section className="work" id="work">
            <div className="work__shell">
                <div className="work__layer">
                    <div className="work__title">Our Work</div>
                    <div className="work__videos">
                        {!isMoreWorks ? 
                            Object.entries(workVideos).slice(1,4).map(([name, value]) => {return (
                            <div className="work__videos-item" id="work__videos-item" key={name}>
                                <span className="videos-item-caption">
                                    {name}
                                </span>
                                <div className="videos-item-content" style={{ backgroundImage: `url(img/${value})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                                </div>
                            </div>
                            )}) 
                        :                            Object.entries(workVideos).map(([name, value]) => {return (
                            <div className="work__videos-item" id="work__videos-item" key={name}>
                                <span className="videos-item-caption">
                                    {name}
                                </span>
                                <div className="videos-item-content" style={{ backgroundImage: `url(img/${value})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                                </div>
                            </div>
                            )}) 
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}