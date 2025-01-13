import Header from "./components/Header"
import InfoBanner from "./components/InfoBanner"
import Main from "./components/Main"
import React from 'react'

export default function App() {

  const headerElement = React.useRef()

  return (
    <>
      <InfoBanner/>
      <Header ref={headerElement}/>
      <Main refHeader={headerElement}/>
    </>
  )
}
