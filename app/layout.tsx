/* Components */
import { Providers } from '@/lib/providers'
import styles from './styles/layout.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <title>Schedule</title>
        <body>
          <main className={styles.main}>{props.children}</main>

          <footer className={styles.footer}>
          </footer>
          <ToastContainer autoClose={1000} />
        </body>
      </html>
    </Providers>
  )
}
