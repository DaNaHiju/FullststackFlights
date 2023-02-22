import React, { useState } from 'react'
import { Input, Button, InputNumber, message } from "antd"

import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCartItem } from '../redux/features/cart/cartSlice';

const FlightCart = (props) => {

    const { flight } = props

    const [tickets, setTickets] = useState(1)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const user_id = useSelector(state => state?.auth?.user?.id)



    const onChange = (value) => {
        setTickets(value)
    };

    const cartClickHandlier = () => {

        if (user_id) {


            message.success(`${tickets} Tickets from ${flight.origin_country.name} to ${flight.destination_country.name} Added to Cart`)

            const cartItem = {
                flight: flight,
                no_of_tickets_purchased: tickets,
                customer: user_id
            }
            dispatch(setCartItem(cartItem))
            navigate("/checkout")


        } else {
            navigate("/login")
        }


    }

    return (
        <>

            <Input.Group>
                Buy Tickets
                <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={cartClickHandlier}
                />
            </Input.Group>


        </>
    )
}

export default FlightCart

