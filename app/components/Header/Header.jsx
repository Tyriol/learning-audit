import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

import books from "../../../public/images/books.png";
import logo from "../../../public/images/logo.png";

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <Image
        className={styles.siteHeaderImage}
        src={logo}
        alt="stacked books"
        width={512}
        height={512}
      />
      <h1 className={styles.siteHeading}>
        The
        <br />
        Learning Audit
      </h1>
    </header>
  );
}
