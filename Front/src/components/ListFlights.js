import React, { useEffect } from 'react'

import Flight from './Flight'
import { selectCurrentFlights, setCurrentFlights } from '../redux/features/flights/flightsSlice'
import { useDispatch, useSelector } from 'react-redux'
import FlightsService from '../services/FlightsService'

import { Card, Row, Col } from 'antd';


const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

const ListFlights = () => {

    // const [flights, setFlights] = useState([])
    const dispatch = useDispatch()

    const flights = useSelector(selectCurrentFlights)




    useEffect(() => {

        FlightsService.fetchFlights()
            .then(resp => {
                dispatch(setCurrentFlights(resp.data))
            })

    }, [dispatch])

    return (
        <>



            <Row gutter={[16, 16]} style={{marginTop:20}}>

                {flights.map((single_flight, index) => {
                    return (

                        <Col key={index} span={6}>

                            <Flight flight={single_flight} />

                        </Col>
                    )
                })}
            </Row>




        </>
    )
}

export default ListFlights