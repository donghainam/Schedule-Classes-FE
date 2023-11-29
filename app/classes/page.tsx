'use client'

import Header from "../home/components/Header";
import styles from "./styles/classes.module.scss"
import NavbarMenu from "../components/navbar/navbar";

const ClassesPage = () => {
    return (
        <>
            <Header />
            <NavbarMenu menuItem="navmenu2" />
            <div className={styles.bodyctn}>
                <div className={styles.contentctn}>
                    <h2>Subject</h2>
                </div>
            </div>

        </>
    )
}

export default ClassesPage;