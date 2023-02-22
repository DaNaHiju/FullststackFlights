import { Button, Form, Input, message } from 'antd';
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, setCredentials } from '../redux/features/auth/authSlice'
import api from "../common/api"


const Login = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const { access, user } = useSelector((state) => state.auth)


    const onFinish = async (values) => {
        setLoading(true)
        const { username, password } = values;

        try {
            const { data } = await api.post("/auth", { username, password })

            dispatch(setCredentials({ ...data }))


            navigate(from, { replace: true })
            message.success("Logged in successfully")
        } catch (err) {
            dispatch(logOut())
            if (err.response.data) {
                message.error(err.response.data.detail)
            } else {

                message.error("Unable to login check backend server")
            }
        }
        setLoading(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <>
            {user ?
                <Navigate to={"/"} />
                :
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
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            span: 4,
                        }}
                    >
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>

            }
        </>

    )
};

export default Login;