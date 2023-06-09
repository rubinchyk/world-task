import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-menu']}>Home</div>
      <div className={styles['footer-copyright']}>2023 Alexey Rubinchyk</div>
    </div>
  );
}