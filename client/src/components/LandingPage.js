import React from 'react';
import {link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div className="landing-page">
            <div className="landing-page-container">
                <div className="landing-page-header">
                    <h1>Welcome to the <span className="landing-page-header-title">Country App</span></h1>
                    <p>This is a simple app that allows you to create, edit, and delete a activity to do in a country.
                        You can also read info about many countries.
                    </p>
                </div>
                    <button className="landing-page-button">
                        <link to="/home">Wellcome</link>
                    </button>
                </div>
            </div>



    )
}