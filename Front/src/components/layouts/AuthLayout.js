import React from 'react';

import { useLocation, Navigate, Outlet, Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../redux/features/auth/authSlice"



import { Breadcrumb, Layout, Menu } from 'antd';
import Unauthorized from '../Unauthorized';
import Logout from '../Logout';


const { Header, Content, Footer } = Layout;




const MenutItem = (props) => {
  const { label, path } = props
  return (
    <><NavLink
      className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      to={path}
    >{label}</NavLink></>
  )
}




const MainLayout = ({ allowedPermissions, publicRoute }) => {

  // const token = useSelector(selectCurrentToken)
  const { access, permissions } = useSelector((state) => state.auth)
  const location = useLocation()


  var isPermitted = permissions?.find(permission => allowedPermissions?.includes(permission))



  const menuItems = [

    {
      key: 1,
      label: <MenutItem label={"Home"} path={"/"} />,
    },
    {
      key: 2,
      label: <MenutItem label={"Checkout"} path={"/checkout"} />,
    },
    {
      key: 3,
      label: <MenutItem label={"Add Flight"} path={"/admin/add-flight"} />,
    },
    {
      key: 4,
      label: <MenutItem label={"Register"} path={"/register"} />,
    }

  ]




  return (<Layout className="layout">
    <Header>
      <div className='header-inner' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <div className="logo" style={{ color: "white", fontSize: '1rem' }}>{process.env.REACT_APP_NAME}</div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          style={{ width: "1080px" }}
        />
        <Logout />
      </div>


    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >

      <div className="site-layout-content">

        {
          publicRoute ? <Outlet /> :
            isPermitted ? <Outlet /> :
              access ? <Unauthorized />

                : <Navigate to="/login" state={{ from: location }} replace />
        }



      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Flight App
    </Footer>
  </Layout>)
};


MainLayout.defaultProps = {
  allowedPermissions: [],
  publicRoute: false,
}
export default MainLayout;