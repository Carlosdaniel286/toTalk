'use client'
import styles from "./page.module.css";
import  {Register } from "@/components/register/register";
export default function Home() {
  return (
    <main className={styles.main}>
       <Register/>
    </main>
  );
}
