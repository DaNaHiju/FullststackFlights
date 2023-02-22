import { Button, Form, Input, message } from 'antd';
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, setCredentials } from '../redux/features/auth/authSlice'
import api from "../common/api"



const Register = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { access, user } = useSelector((state) => state.auth)

    const onFinish = async (values) => {
        setLoading(true)

        try {
            await api.post("/api/users/", { ...values })
            navigate('/login')
            message.success("Registeration successfull")
        } catch (err) {
            // dispatch(logOut())

            message.error("Failed to register")
        }
        setLoading(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>

            {
                user ? <Navigate to={"/"} /> :
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
                            label="First Name"
                            name="first_name"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your first name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lirst_name"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your last name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

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
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
            }




        </>
    )
}

export default Register