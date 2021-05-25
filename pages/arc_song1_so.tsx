import React, { Fragment } from 'react';
import ReactNoSSR from 'react-no-ssr';
import dynamic from 'next/dynamic';

const VolumetricPlayer = dynamic(() => import('../components/VolumetricPlayer'), { ssr: false });

export default () => {
    return (
        <Fragment>
            <section className="volumetric__wrapper" >
              <ReactNoSSR>
                <VolumetricPlayer style={{ width: '100%', height: '100%' }} meshFilePath={"/vol/song/so_starlight_low.drcs"} videoFilePath={"/vol/song/so_starlight_low.mp4"} />
              </ReactNoSSR>
            </section>
        </Fragment>
    );
};
