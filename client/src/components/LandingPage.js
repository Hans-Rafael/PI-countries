import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div >
            <div >
                <div>
                    <h1 >Hello World!</h1>
                    <Link to='/home'>
                        <button >WELLCOME</button>
                    </Link>
                </div>
            </div>
        </div>



    )
}