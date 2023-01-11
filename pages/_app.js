import '../styles/globals.css'
import react from 'react'
import {Layout} from '../Components';
import {StateContext} from '../context/StateContext';
import {Toaster} from 'react-hot-toast'


function App({Component,pageProps}){
  return(
  <StateContext>
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  </StateContext>
  )
}
export default App

