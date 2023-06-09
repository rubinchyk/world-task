import styles from './layout.module.scss'
import Header from '../components/header'
import Footer from '../components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <div className={styles['container']}>
          <Header />
            <div className={styles['main-wrapper']}>
              {children}
            </div>
          <Footer />
        </div>
  )
}
