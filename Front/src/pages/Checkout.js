import { message } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import CheckoutForm from '../components/CheckoutForm'
import Flight from '../components/Flight'
import PaymentForm from '../components/PaymentForm'
import { selectCheckoutFlight } from '../redux/features/cart/cartSlice'

const Checkout = () => {

    const flight = useSelector(selectCheckoutFlight)

    if (!flight){
        message.warning("Please Add flight to Cart")
    }




    return (
        <>
            <div>
                Checkout
            </div>
            {flight ?
                <React.Fragment>
                    <Flight flight={flight} />

                    {/* <PaymentForm /> */}
                    <CheckoutForm />

                </React.Fragment>
                : <Navigate to={"/"} />


            }
        </>
    )
}

export default Checkout