import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.world} >
            <div className={styles.container} >
                <h1>World Turitic Activity Ornanizer</h1>
                <Link to='/home'>
                    <button className={styles.button} >WELLCOME</button>
                </Link>
            </div>
        </div>

    )
}
//by Class  nee import components from react///
/* export class LandingPages extends Components {
   render(){
       <main>
           <h1>actyvity organizer for turist</h1>
           <selection>
               <Link to ="/home"> WELLCOME</Link>
           </selection>
       </main>
   }
}  */

export default LandingPage
