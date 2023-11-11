import { Layout } from '../components'
import '../styles/globals.css'
import { StateContext } from '../context/stateContext'
import { Toaster } from 'react-hot-toast'

 function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster/>
    <Layout>
      <Component {...pageProps} />      
    </Layout>
    </StateContext>
  )
}


export default App