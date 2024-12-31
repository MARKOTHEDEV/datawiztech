import React, { useState } from 'react'
import './AccountVerification.css'
import './Verification.css'
import './Referee.css'
import Header from '../Header/Header'
import Verification from './Verification'

const AccountVerification = () => {
  const [active, setActive] = useState("home")
  return (
    <div>
      <Header active={active}/>
      <Verification/>
    </div>
  )
}

export default AccountVerification
