import Logo from "../logo";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles['header']}>
      <Logo />
    </div>
  );
}