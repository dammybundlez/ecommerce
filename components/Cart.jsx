import React, { useRef} from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineMinus , AiOutlinePlus , AiOutlineLeft , AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import Link from 'next/link'
import { useStateContext } from '../context/stateContext'
import { urlFor } from '../lib/client'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice , totalQuantities , cartItems , setShowCart , toggleCartItemQuanitity, onRemove } = useStateContext()
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button type='button' className='cart-heading' onClick={() =>  setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            <h3>Shopping Bag is Empty</h3>
            <Link href='/'>
              <button value='button' className='btn' onClick={() => setShowCart(false)}>Continue Shopping</button>
            </Link>
          </div>
          )}

          <div className='product-container'>
            {cartItems.length >= 1 && cartItems.map((items) => (
                <div className='product' key={items._id}>
                  <img src={urlFor(items?.image[0])} className='cart-product-image'/>
                  <div className='item-desc'>
                    <div className='flex top'>
                      <h5>{items.name}</h5>
                      <h4>${items.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className='quantity-desc'>
                          <span className='minus' 
                          onClick={toggleCartItemQuanitity(items._id )}
                          >
                            <AiOutlineMinus/></span>
                          <span className='num'>{items.quantity}</span>
                          <span className='plus' 
                          onClick={toggleCartItemQuanitity(items._id)}
                          >
                            <AiOutlinePlus/></span>
                        </p>
                      </div>
                      <button value='button' className='remove-item' onClick={() => onRemove(items)}> <TiDeleteOutline/></button>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {cartItems.length >= 1 && (
            <div className='cart-bottom'>
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button type='button' className='btn' onClick=''>
                  Pay With Stripe
                </button>
              </div>
            </div>
          )}
      </div>
      
    </div>
  )
}

export default Cart