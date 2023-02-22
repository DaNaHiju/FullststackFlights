import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../redux/features/auth/authSlice'

const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)

    function logoutHandler(e) {
        e.preventDefault()

        dispatch(logOut())

        navigate("/")

    }
    function loginHandler(e) {
        e.preventDefault()

        navigate("/login")

    }



    return (
        <>
            {user ? <Button type='danger' onClick={logoutHandler}>Logout</Button> : <Button type='primary' onClick={loginHandler}>Login</Button>}

        </>
    )
}

export default Logout