"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { AuthContext } from "@/app/context/authContext";

import logo from "../../../public/images/logo.png";

export default function Header() {
  const { isAuthenticated, user, handleLogout } = useContext(AuthContext);
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
            <Link href="/routes/modules" className={styles.navLink}>
              Modules
            </Link>
          </li>
          <li>
            {!isAuthenticated ? (
              <Link href="/routes/auth" className={styles.navLink}>
                Auth Page
              </Link>
            ) : (
              <button onClick={handleLogout} className={styles.navLink}>
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
