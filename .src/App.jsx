import Header from "./components/Header"
import Main from "./components/Main"
import React from 'react'

export default function App() {

  const headerElement = React.useRef()

  return (
    <>
      <Header ref={headerElement}/>
      <Main refHeader={headerElement}/>
    </>
  )
}
