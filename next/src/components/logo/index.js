import styles from './Logo.module.scss';
import { useRouter } from 'next/router';

export default function Header({ children }) {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  }

  return (
    <>
      <div onClick={goToHome} className={styles['logo-wrapper']}>
        <div className={styles['logo-icon']}></div>
        <div className={styles['logo-title']}>POSTS</div>
      </div>
    </>
  );
}