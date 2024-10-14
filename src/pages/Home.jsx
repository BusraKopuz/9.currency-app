import React from 'react'
import Currency from '../components/Currency';


import '../App.css'


function Home() {
  

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Currency />
    </div>
  )
}

export default Home