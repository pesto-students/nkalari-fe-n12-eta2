import React from 'react'
import { connect } from 'react-redux'
import { userActions } from '../../actions/user.action'
import Navbar from '../navbar/Navbar'

import './Layout.module.css'

const Layout = ({children}) => {
  return (
    <main className='w-full flex flex-row'>
      <Navbar className="nav-bar w-2/12"></Navbar>
      <div className="content-col w-10/12">
        {children}
      </div>
    </main>
  )
}


export default Layout
