import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  return <div className={styles.container}>Home Page</div>;
}
