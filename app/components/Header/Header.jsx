import React from "react";
import Image from "next/image";
import styles from './Header.module.css';

import books from "../../../public/images/books.png";

export default function Header() {
    return(
        <header className={styles.siteHeader}>
            The Learning Audit <Image className={styles.siteHeaderImage} src={books} alt="stacked books" width={512} height={512} />
        </header>
    )
}