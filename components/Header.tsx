import React, { useState } from 'react';
import Link from 'next/link';

export const Header = () => {
    
    const [toggleHamburgerMenu, setToggleHamburgerMenu] = useState(false)

    const handleHamburgerMenu = () => {
        setToggleHamburgerMenu(!toggleHamburgerMenu)
    }

    return (  
        <header className="header">
            <div className="header__shell">
                <div className="header__row">
                    <Link href="/" >
                        <a className="header__logo" id="header__logo">
                            <img src={"../img/wildcapture-logo.svg"} />
                        </a>
                    </Link>
                    <div className="header__aside">
                        <nav className="header__nav">
                            <Link href="/volumetric">
                                <a className="nav__nav-link">Volumetric</a>  
                            </Link>
                            <a href="/#about" className="nav__nav-link">About</a>
                            <a href="/#work" className="nav__nav-link">Work</a>
                            <a href="/#contact" className="nav__nav-link">Contact</a>
                        </nav>
                        {toggleHamburgerMenu ? 
                            <nav className="header__hamburger-menu">
                                <Link href="/volumetric">
                                    <a className="nav__nav-link" onClick={handleHamburgerMenu}>Volumetric</a>
                                    
                                </Link>
                                <a href="/#about" className="nav__nav-link" onClick={handleHamburgerMenu}>About</a>
                                <a href="/#work" className="nav__nav-link" onClick={handleHamburgerMenu}>Work</a>
                                <a href="/#contact" className="nav__nav-link" onClick={handleHamburgerMenu}>Contact</a>
                                <form className="hamburger-getintouch-container" method="LINK" action="/#contact">
                                    <button className="button hamburger-getintouch">Get in touch</button>
                                </form>
                                <button 
                                    className="header__hamburger-close" 
                                    onClick={handleHamburgerMenu} 
                                    style={{ backgroundImage: `url(img/hamburger-close-cross.svg)`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
                                >
                                </button>
                            </nav>
                        : 
                        <button 
                            className="header__hamburger-button" 
                            onClick={handleHamburgerMenu} 
                            style={{ backgroundImage: `url(img/hamburger-menu-icon.svg)`, backgroundRepeat: 'no-repeat'}}
                        >
                        </button>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}