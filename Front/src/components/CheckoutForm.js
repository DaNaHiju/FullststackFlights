import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, DatePicker, InputNumber } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, setCredentials } from '../redux/features/auth/authSlice'
import api from "../common/api"

import moment from 'moment';
import { Row, Select } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import FlightsService from '../services/FlightsService';
import { setCurrentFlights } from '../redux/features/flights/flightsSlice';
import dayjs from 'dayjs'
import { setCartItem } from '../redux/features/cart/cartSlice';

const { RangePicker } = DatePicker;

const { Option } = Select;


const CheckoutForm = () => {

    // const [countries, setCountries] = useState([])
    // const [airlines, setAirlines] = useState([])
    const { cartItem: { no_of_tickets_purchased, customer, flight } } = useSelector(state => state.cart)


    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const onFinish = async (values) => {
        setLoading(true)
        console.log("Here", no_of_tickets_purchased, customer, flight)
        const { credit_card_no, address, phone_no } = values;

        try {
            const { data } = await api.post("/api/tickets/", { credit_card_no, address, phone_no, flight: flight.id, no_of_tickets_purchased })
            console.log(data)

            message.success("Your Ticket Purchase is Successfull")
            dispatch(setCartItem({}))
            navigate("/")
        } catch (err) {
            if (err.response.data) {
                message.error(err.response.data.detail)
            } else {

                message.error("Something went wrong")
            }
        }
        setLoading(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    // const handleOriginCountryChange = (value) => {


    //     setParams((params => ({
    //         ...params, ['origin_country']: value
    //     })))


    // };
    // const handleDestinationCountryChange = (value) => {

    //     setParams((params => ({
    //         ...params, ['destination_country']: value
    //     })))

    // };

    return (
        <>
            <Form
                layout='vertical'
                name="basic"
                // labelCol={{
                //     span: 4,
                // }}
                // wrapperCol={{
                //     span: 4,
                // }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >


                <Form.Item
                    label="Credit Card No"
                    name="credit_card_no"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                    />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                    />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone_no"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                    />
                </Form.Item>




                <Form.Item
                >
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Checkout
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

export default CheckoutForm