import React, { Fragment } from 'react';
import ReactNoSSR from 'react-no-ssr';
import dynamic from 'next/dynamic';

const VolumetricPlayer = dynamic(() => import('../components/VolumetricPlayer'), { ssr: false });

export default () => {
    return (
        <Fragment>
            <section className="volumetric__wrapper" >
              <ReactNoSSR>
                <VolumetricPlayer style={{ width: '100%', height: '100%' }} meshFilePath={"/vol/brennan_textureu_v_bake.drcs"} videoFilePath={"/vol/brennan_1K_10mpbs.mp4"} />
              </ReactNoSSR>
            </section>
        </Fragment>
    );
};
