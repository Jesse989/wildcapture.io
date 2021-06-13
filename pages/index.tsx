import React, { Fragment } from 'react'
import { About } from '../components/About'
import { Work } from '../components/Work'
import { Contact } from '../components/Contact'
import { Header } from '../components/Header'

export default () => {
    return (
        <div className="container">
            <Header />
            <section className="home-banner">
                <video className="home-banner-movie" autoPlay loop muted>
                    <source src="../movie/banner-slide-movie.mp4"></source>
                </video>
            </section>
            <About />
            <Work />
            <Contact />
        </div>
    )
}