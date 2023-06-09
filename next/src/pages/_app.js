import Layout from '../components/layout';
import './styles.scss'; 

export default function Project({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}