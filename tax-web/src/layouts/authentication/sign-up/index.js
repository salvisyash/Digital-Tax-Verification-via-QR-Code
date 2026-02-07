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

// Tax verification React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout1";

import axios from "axios";
import { ipofserver } from 'global';

function SignUp() {

  const [inputField, setInputField] = useState({
    fname: '',
    username: '',
    email: '',
    mobile: '',
    password: ''
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
      fname: '',
      username: '',
      email: '',
      mobile: '',
      password: ''
    });
  }
  
  const submitButton = () => {
    // alert(inputField.password)
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (inputField.username == '' || inputField.email == '' || inputField.mobile == '' || inputField.password == '' || inputField.fname == '') {
      alert("Please enter all details !")
    }
    else if (inputField.username.length < 8) {
      alert("Username must be 8 characters !")
    }
    else if (inputField.mobile.length != 10) {
      alert("Please enter valid mobile number !")
    }
    else if (!filter.test(inputField.email)) {
      alert("Please enter valid email !")
    }
    else {
      axios.post(ipofserver + 'users/userRegister', {
        fname: inputField.fname,
        username: inputField.username,
        email: inputField.email,
        mobile: inputField.mobile,
        password: inputField.password
      })
        .then(function (response) {
          if (response.data == "success") {
            alert("User added successfully !")
            clearInput()
            window.location.href = '/authentication/sign-in'
          }
          else {
            alert("User already exist !")
            clearInput()
          }
        })
        .catch(function (error) {
          return error;
        });
    }
  }

  return (
    <CoverLayout
      title="Create Account !"
      description="Enter your login details to Sign Up"
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Full name
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="Enter full name" name="fname" value={inputField.fname}
            onChange={inputsHandler}  />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="Enter username" name="username" value={inputField.username}
            onChange={inputsHandler} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Enter email" name="email" value={inputField.email}
            onChange={inputsHandler} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Mobile number
            </SoftTypography>
          </SoftBox>
          <SoftInput type="number" placeholder="Enter mobile number" name="mobile" value={inputField.mobile}
            onChange={inputsHandler}/>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Enter password" name="password" value={inputField.password}
            onChange={inputsHandler} />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" onClick={submitButton} fullWidth>
            sign up
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Do have an account ?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient>
              Sign in
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignUp;
