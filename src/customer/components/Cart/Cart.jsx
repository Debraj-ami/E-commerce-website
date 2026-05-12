import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getCart } from 'State/Cart/Action'
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {cart}=useSelector(store=>store)
    const handleCheckOut=()=>{
        navigate("/checkout?step=2")
    }

    useEffect(()=>{
        dispatch(getCart())
    },[])
  return (
    <div>
        <div className='lg:grid grid-cols-3 lg:px-16 relative'>
            <div className='col-span-2'>
                {cart.cart?.cartItems.map((item)=><CartItem item={item}/>)}
            </div>
        
          <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
            <div className='border'>
                <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                <hr />
                <div className='space-y-3 font-semibold mb-10'>
                    <div className='flex justify-between pt-3 text-black'>
                        <span>Price</span>
                        <span>{cart.cart?.totalPrice}</span>


                    </div>
                    <div className='flex justify-between pt-3 text-green-600'>
                        <span>Discounts</span>
                        <span>-₹{cart.cart?.discounte}</span>


                    </div>
                    <div className='flex justify-between pt-3'>
                        <span>Delivery Charge</span>
                        <span className=' text-green-600'>Free</span>


                    </div>
                    <div className='flex justify-between pt-3 '>
                        <span>Total Amounts</span>
                        <span className='text-green-600 font-bold'>₹{cart.cart?.totalDiscountedPrice}</span>


                    </div>

                </div>
                <Button onClick={handleCheckOut} variant='contained' className='w-full mt-5' sx={{p:"2.5rem",py:"0.7rem",bgcolor:"#9155fd"}}>
                    CHECKOUT
                </Button>


            </div>

        </div>
        </div>
        
        
    </div>
  )
}

export default Cart