import React from 'react'
import styles from './styles/Pages.module.css';

const Paging = ({ countriesOnPage, countries, pages, currPage }) => {

    const pagNum = [];

    for (let i = 1; i <= Math.ceil(countries / countriesOnPage); i++) {
        pagNum.push(i);
    }

    return (
        <div className={styles.pagesList}>

            {pagNum.length ? pagNum.map(num => (
                
                    <span onClick={() => pages(num)} key={num} className={styles.num}>
                        {num}
                    </span>
                   
            ))

                : null
            }
        </div>
    )
}

export default Paging