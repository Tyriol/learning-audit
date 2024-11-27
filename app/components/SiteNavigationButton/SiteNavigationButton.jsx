import Link from "next/link";
import styles from "./SiteNavigationButton.module.css";

export default function SiteNavigationButton({ title, link }) {
  return (
    <Link className={styles.buttonLink} href={link}>
      <button className={styles.button}>{title}</button>
    </Link>
  );
}
