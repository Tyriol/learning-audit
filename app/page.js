"use client";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { AuthContext } from "@/app/context/authContext";

import heroImage from "../public/images/hero-image.png";

export default function LandingPage() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <section className={styles.heroMessage}>
        <h1>OWN YOUR LEARNING JOURNEY</h1>
        <p className={styles.description}>
          Learning fast doesn’t mean rushing. <br />
          Pause. Reflect. Plan. Act.
          <br />
          Take control of your progress with intention.
        </p>
        {!isAuthenticated ? (
          <Link href="/routes/auth">
            <button type="button">Start your Learning Audit now</button>
          </Link>
        ) : null}
      </section>
      <section aria-label="landing page image" className={styles.heroImgContainer}>
        <Image
          className={styles.heroImg}
          src={heroImage}
          width={500}
          height={500}
          alt="image of a person sitting down to plan their learning"
        />
      </section>
    </div>
  );
}
