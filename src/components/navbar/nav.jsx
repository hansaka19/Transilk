import React from 'react'
import { useState } from 'react'
import avatar from '../assets/react.svg'
import './nav.css'

function Nav() {
  return (
    <div className="container">
        <div className="sidebar">
            <div className="head">
                <div className="user-img">
                    <img src={avatar} alt="User Avatar"/>
                </div>
                <div className="user-details">
                    <p className="title">Premium</p>
                    <p className="name">Chamikara</p>
                </div>
                <div className="nav">
                    <div className="menu">
                        <p className="title">Main</p>
                        <ul>
                            <li>
                                <a href="#">
                                    <ph-icon name="house"></ph-icon>
                                    <span className="text">Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nav