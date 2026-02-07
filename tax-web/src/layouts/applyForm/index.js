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

// @mui material components
import Card from "@mui/material/Card";
import { useState } from "react";

// Tax verification React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Tax verification React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Select from "react-select";

import axios from "axios";
import { ipofserver } from 'global';

const options = [
  { label: "Select Tax Credits", value: "" },
  { label: "Income Tax", value: "Income Tax" },
  { label: "Property", value: "Property" },
];
const options1 = [
  { label: "Select Filing Status", value: "" },
  { label: "Single", value: "Single" },
  { label: "Married Filing Jointly", value: "Married Filing Jointly" },
  { label: "Head of Household", value: "Head of Household" },
];

const styles = {
  control: base => ({
    ...base,
    fontFamily: "Calibri",
    fontSize: '16px'
  }),
  menu: base => ({
    ...base,
    fontFamily: "Calibri",
    fontSize: '16px'
  })
};

function ApplyForm() {

  const [inputField, setInputField] = useState({
    fname: '',
    taxno: '',
    dob: '',
    address: '',
    sdate: '',
    edate: '',
    income: '',
    accnumber: ''
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
      taxno: '',
      dob: '',
      address: '',
      sdate: '',
      edate: '',
      income: '',
      accnumber: ''
    });
    setSelectedFile('');
    setSelectedValue('');
    setSelectedValue1('');
  }

  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue1, setSelectedValue1] = useState('');

  const [selectedFile, setSelectedFile] = useState();

  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  const handleChange1 = e => {
    setSelectedValue(e.value);
  }

  const handleChange2 = e => {
    setSelectedValue1(e.value);
  }

  const submitButton = async () => {
    if (inputField.fname == '' || inputField.taxno == '' || inputField.dob == '' || inputField.address == '' || inputField.sdate == ''
      || inputField.edate == '' || inputField.income == '' || inputField.accnumber == '' || selectedValue == '' || selectedValue1 == '' || selectedFile == undefined) {
      alert("Please enter all details !")
    }
    else {
      const formData = new FormData();

      formData.append('fname', inputField.fname);
      formData.append('taxno', inputField.taxno);
      formData.append('dob', inputField.dob);
      formData.append('address', inputField.address);
      formData.append('sdate', inputField.sdate);
      formData.append('edate', inputField.edate);
      formData.append('income', inputField.income);
      formData.append('accnumber', inputField.accnumber);
      formData.append('credits', selectedValue);
      formData.append('fillingstatus', selectedValue1);
      formData.append('File', selectedFile);
      formData.append('username', localStorage.getItem('LoginUsername'));

      const res = await axios.post(`${ipofserver}users/applyForm`, formData);

      console.log(res);

      if(res.data == 'success'){
        alert("Application is stored in portal !")
        clearInput()
      }
      else{
        alert('Something went wrong !')
      }

    }

  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h4">Apply for Tax verification</SoftTypography>
            </SoftBox>
            <SoftBox component="form" role="form" m={5}>
              <SoftBox mb={2} mt={-5}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Full name as per ID
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="text" placeholder="Enter full name as per ID" name="fname" value={inputField.fname}
                  onChange={inputsHandler} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Tax Identification Number
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="number" placeholder="Enter Tax Identification Number" name="taxno" value={inputField.taxno}
                  onChange={inputsHandler} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Date of Birth
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="date" placeholder="Enter Date of Birth" name="dob" value={inputField.dob}
                  onChange={inputsHandler} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Address
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="text" placeholder="Enter address" name="address" value={inputField.address}
                  onChange={inputsHandler} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Employment Start and End Dates
                  </SoftTypography>
                </SoftBox>
                <div style={{ display: 'flex' }}>
                  <SoftInput type="date" name="sdate" style={{ margin: 5 }} value={inputField.sdate}
                    onChange={inputsHandler} />
                  <SoftInput type="date" name="edate" style={{ margin: 5 }} value={inputField.edate}
                    onChange={inputsHandler} />
                </div>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Total Income
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="number" placeholder="Enter Total Income" name="income" value={inputField.income}
                  onChange={inputsHandler} />
              </SoftBox>

              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Tax Credits Claimed
                  </SoftTypography>
                </SoftBox>
                <Select className="select" styles={styles} options={options} onChange={handleChange1}
                  value={options.find(obj => obj.value === selectedValue)} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Filing Status
                  </SoftTypography>
                </SoftBox>
                <Select className="select" styles={styles} options={options1} onChange={handleChange2}
                  value={options1.find(obj => obj.value === selectedValue1)} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Account Number
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="number" placeholder="Enter Account Number" name="accnumber" value={inputField.accnumber}
                  onChange={inputsHandler} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftBox mb={1} ml={0.5}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold">
                    Sign
                  </SoftTypography>
                </SoftBox>
                <SoftInput type="file" name="file" onChange={handleChange} />
              </SoftBox>

              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" onClick={submitButton} fullWidth>
                  Apply For Tax
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ApplyForm;
