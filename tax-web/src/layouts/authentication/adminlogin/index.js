/**
=========================================================
* Tax verification React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Tax verification React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import axios from "axios";
import { ipofserver } from 'global';
// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function AdminLogin() {

  const [inputField, setInputField] = useState({
    username: 'admin',
    password: 'admin'
  })

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function clearInput() {
    setInputField({
      username: '',
      password: ''
    });
  }

  function setData(sessionname) {
    localStorage.setItem('LoginUsername', sessionname);
  }

  const submitButton = () => {
    if (inputField.username == '' || inputField.password == '') {
      alert("Please enter all details !")
    }
    else {
      if (inputField.username == 'admin' && inputField.password == 'admin') {
        setData(inputField.username)
        window.location.href = '/admindashboard'
      }
      else {
        alert("Invalid Admin credentials !")
        clearInput()
      }
    }
  }

  return (
    <CoverLayout
      title="Welcome back to Admin Portal"
      description="Enter your username and password"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Admin Username
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="Enter username" name="username" value={inputField.username}
            onChange={inputsHandler} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Admin Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Enter password" name="password" value={inputField.password}
            onChange={inputsHandler} />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" onClick={submitButton} fullWidth>
            Admin sign in
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default AdminLogin;
