import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, DatePicker, InputNumber } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, setCredentials } from '../redux/features/auth/authSlice'
import api from "../common/api"

import moment from 'moment';
import { Row, Select, Upload } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import FlightsService from '../services/FlightsService';
import { setCurrentFlights } from '../redux/features/flights/flightsSlice';
import dayjs from 'dayjs'
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { RangePicker } = DatePicker;

const { Option } = Select;


const AddFlight = () => {

    const [countries, setCountries] = useState([])
    const [airlines, setAirlines] = useState([])

    const [image_id, setImageId] = useState(false);

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const token = useSelector(state => state.auth.access)
    const from = location.state?.from?.pathname || "/";

    const onFinish = async (values) => {
        setLoading(true)
        // const { username, password } = values;

        
        values = {
            ...values,
            image : values.image.file.response.id
        }
        
        

        try {
            const { data } = await api.post("/api/flights/", { ...values })

            message.success("New Flight Added Successfully")
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
        var data = errorInfo.values;


        data = {
            ...data,
            image : data.image.file.response.id
        }


        console.log('Failed:', data);
    };

    useEffect(() => {

        api.get("/api/countries")
            .then((resp) => {
                setCountries(resp.data)
            })

        api.get("/api/airlines")
            .then((resp) => {
                setAirlines(resp.data)
            })
    }, [])



    const uploadprops = {
        name: 'file',
        action: process.env.REACT_APP_API_URL + "/api/flights/image_upload/",
        headers: {
            'authorization': 'Bearer ' + token,

        },

        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }

          if (info.file.status === 'done') {

            setImageId(info.file.response.id)

            console.log(info.file.response.id)
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };




    return (
        <>
            <Form
                layout='vertical'
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 4,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >


                <Form.Item
                    label="Remaining Tickets"
                    name="remaining_tickets"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber
                        min="0"
                        max="400"
                    />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >

                    <Upload {...uploadprops}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>

                </Form.Item>


                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber
                        min="20"
                        max="5000"
                    />
                </Form.Item>

                <Form.Item
                    label="Origin Country"
                    name="origin_country"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        defaultValue="from"
                        allowClear
                    >
                        <Option value="from" disabled>
                            From
                        </Option>

                        {countries.map((country, index) => {
                            return <Option key={country.id} value={country.id}>{country.name}</Option>
                        })}



                    </Select>

                </Form.Item>

                <Form.Item
                    label="Destination Country"
                    name="destination_country"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        defaultValue="to"
                        allowClear
                    >
                        <Option value="to" disabled>
                            To
                        </Option>

                        {countries.map((country, index) => {
                            return <Option key={country.id} value={country.id}>{country.name}</Option>
                        })}



                    </Select>

                </Form.Item>

                <Form.Item
                    label="Airline Company"
                    name="airline_company"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        defaultValue="none"
                        allowClear
                    >
                        <Option value="none" disabled>
                            Choose Airline Company
                        </Option>

                        {airlines.map((airline, index) => {
                            return <Option key={airline.id} value={airline.id}>{airline.name}</Option>
                        })}



                    </Select>

                </Form.Item>




                <Form.Item
                    label="Departure Time"
                    name="departure_time"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker showTime />


                </Form.Item>

                <Form.Item
                    label="Landing Time"
                    name="landing_time"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker showTime />


                </Form.Item>





                <Form.Item
                    wrapperCol={{
                        span: 4,
                    }}
                >
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Add Flight
                    </Button>
                </Form.Item>
            </Form>



        </>
    )
}

export default AddFlight