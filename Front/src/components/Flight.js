import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, message } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFlights } from '../redux/features/flights/flightsSlice';
import FlightsService from '../services/FlightsService';
import FlightCart from './FlightCart';
const { Meta } = Card;

const Flight = ({ flight }) => {

    const allowedPermissions = ['base.delete_flight']
    const dispatch = useDispatch()

    const {permissions} = useSelector(state=>state.auth)

    function handleDelete(){

        FlightsService.deleteFlight(flight.id)
        .then((resp)=>{
            message.success("Flight Deleted Successfully")
            FlightsService.fetchFlights()
            .then(resp => {
                dispatch(setCurrentFlights(resp.data))
            })

            
        }).catch(err=>{
            message.err("Cant delete flight")
        })


        console.log("You are about to delete flight", flight.id)
    }

    var isPermitted = permissions?.find(permission => allowedPermissions?.includes(permission))
    return (
        <Card

            cover={
                <img
                    alt={flight.id}
                    src={flight?.image?.destination_picture}
                />
            }
        // actions={[
        //     <SettingOutlined key="setting" />,
        //     <EditOutlined key="edit" />,
        //     <EllipsisOutlined key="ellipsis" />,
        // ]}
        >
            {/* <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Card title"
                description="This is the description"
            /> */}
            <p>From : {flight.origin_country.name}</p>
            <p>To : {flight.destination_country.name}</p>
            <p>To : {flight.departure_time}</p>
            <p>To : {flight.landing_time}</p>
            <p>Remaining Tickets : {flight.remaining_tickets}</p>
            <p>Price : {flight.price}$</p>

            <FlightCart flight={flight} />

            {
                isPermitted ?
                <Button onClick={handleDelete} danger>Delete Flight</Button>
                : ""
            }

        </Card>
    )
}

export default Flight