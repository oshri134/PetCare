import React from 'react'
import Navbar from '../Navbar/Navbar'

const Layout = (props) => {
    return (
        <div style={{display: 'flex', flexDirection:'column', width: '100%', height: '100%'}}>
            <Navbar/>
            <div style={{padding: '5%'}}>
            {props.children}
            </div>
        </div>
    )
}

export default Layout
