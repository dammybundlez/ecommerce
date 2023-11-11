import React from 'react'
import { AiFillFacebook , AiOutlineTwitter } from 'react-icons/ai'


const Footer = () => {
  return (
    <div className='footer-container'>
        <p>2023 Gbagam Gadget All Right Reserved</p>
        <p className='icons'>
            <AiFillFacebook />
            <AiOutlineTwitter />
        </p>
        
    </div>
  )
}

export default Footer