import moment from 'moment';
import { Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';


import api from "../common/api"


import { DatePicker, Button } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import FlightsService from '../services/FlightsService';
import { setCurrentFlights } from '../redux/features/flights/flightsSlice';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs'

const { RangePicker } = DatePicker;

const { Option } = Select;



const SearchFilter = () => {

    const dateFormat = 'YYYY/MM/DD h:mm a';


    const [countries, setCountries] = useState([])

    const [params, setParams] = useState({})

    const dispatch = useDispatch()


    // const fetchFlights

    const handleDateChange = (value) => {


        if (value !== null) {


            setParams((values => ({
                ...values, ['from']: dayjs(value[0]).format('YYYY-MM-DD HH:MM:ss')
            })))

            setParams((values => ({
                ...values, ['to']: dayjs(value[1]).format('YYYY-MM-DD HH:MM:ss')
            })))

        } else {

            setParams((values) => {
                const { from, ...rest } = values;
                return rest
            })

            setParams((values) => {
                const { to, ...rest } = values;
                return rest
            })
        }

    };

    const handleOriginCountryChange = (value) => {


        setParams((params => ({
            ...params, ['origin_country']: value
        })))


    };
    const handleDestinationCountryChange = (value) => {

        setParams((params => ({
            ...params, ['destination_country']: value
        })))

    };




    useEffect(() => {

        api.get("/api/countries")
            .then((resp) => {
                setCountries(resp.data)
            })
    }, [])


    const searchFlightsHandler = (e) => {

        e.preventDefault()

        // var data = {
        //     "origin_country" : "Pakistan"
        // }




        FlightsService.fetchFlights(params)
            .then(resp => {
                dispatch(setCurrentFlights(resp.data))
            })


        // alert("Flights are searching now")

    }




    return (

        <div style={{ display: "flex", justifyContent: "center" }}>
            <Select
                defaultValue="from"
                allowClear
                style={{
                    width: 120,
                }}
                onChange={handleOriginCountryChange}
            >
                <Option value="from" disabled>
                    From
                </Option>

                {countries.map((country, index) => {
                    return <Option key={country.id} value={country.name}>{country.name}</Option>
                })}



            </Select>

            <Select
                defaultValue="to"
                allowClear
                style={{
                    width: 120,
                }}
                onChange={handleDestinationCountryChange}
            >
                <Option value="to" disabled>
                    To
                </Option>
                {countries.map((country, index) => {
                    return <Option key={country.id} value={country.name}>{country.name}</Option>
                })}
            </Select>


            <RangePicker
                showTime
                onChange={handleDateChange}
                // defaultValue={[moment('2022/01/01 12:00 a', dateFormat), moment('2022/01/02 12:00 a', dateFormat)]}
                format={dateFormat}
            />

            <Button onClick={searchFlightsHandler} icon={<SearchOutlined />}>Search</Button>

        </div>


    )


}

export default SearchFilter;