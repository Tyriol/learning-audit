import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

import logo from "../../../public/images/logo.png";

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.logoTitle}>
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
      </div>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/modules" className={styles.navLink}>
              Modules
            </Link>
          </li>
          <li>
            <Link href="/auth" className={styles.navLink}>
              Auth Page
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
