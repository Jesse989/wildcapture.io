import React from 'react';
import ReactNoSSR from 'react-no-ssr';
import { Header } from '../components/Header';
import VolumetricPlayer from '../components/VolumetricPlayer';


export default () => {
    return (
        <div className="container">
            <Header />
            <section className="volumetric__wrapper" >
              <ReactNoSSR>
              <VolumetricPlayer style={{ width: '100%', height: '100%' }} meshFilePath={"/vol/ohno_jugo_low.drcs"} videoFilePath={"/vol/ohno_jugo_low.mp4"} />
              </ReactNoSSR>
            </section>
        </div>
    )
}
