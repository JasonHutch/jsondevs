import React from "react";
import styles from '../styles/Loading.module.css'
import Image from 'next/image'

export default function Loading(props) {
  return (
    <div className={props.loading ? styles.body_loading : styles.none}>
      <div className={styles.lds_ellipsis}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}