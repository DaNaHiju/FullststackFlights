import { Outlet } from "react-router-dom"
import { Layout } from 'antd';
import React from 'react';
import Logout from "../Logout";
const { Content, Footer, Header } = Layout;

const PublicLayout = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Header
            style={{
                position: 'fixed',
                zIndex: 1,
                width: '100%',
            }}
        >
            <div className="logo">Flight App</div>
            <Logout />
        </Header>
        <Content
            className="site-layout"
            style={{
                padding: '0 50px',
                marginTop: 100,
            }}
        >

            <div
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 380,
                }}
            >
                <Outlet />
            </div>
        </Content>
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Flight App
        </Footer>
    </Layout>
);

export default PublicLayout;