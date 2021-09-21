import '../styles/globals.css';
import GlobalStyles from '../components/global-styles'

function MyApp({ Component, pageProps }) {
  return (
  <>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
