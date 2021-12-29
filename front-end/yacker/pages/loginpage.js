import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/login'
import Nav from "../components/Nav"
import { useState } from 'react'
//import styles from '../styles/Login.module.css'

export default function LoginPage() {

  return (<>
  <Head>
    <meta name="exoclick-site-verification" content="4f6086c3b9e6543f5f7f4df5c4184df2"/>
      <title>Admin login</title>
  </Head>
  <Nav/>
  <Login/>
  </>)

}
