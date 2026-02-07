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

import React, { useEffect, useState } from 'react';

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout2";
import '../FullWidthTable.css'; // Import your CSS file

import axios from "axios";
import { ipofserver } from 'global';
import SoftButton from "components/SoftButton";
import Modal from 'react-bootstrap/Modal';
import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";

function AdminDashboard() {

  const [hospitals, setHospitals] = useState([]);
  const [taxdata, setTaxdata] = useState([]);
  const [isVerify, setIsVerifyData] = useState(false);

  useEffect(() => {
    axios.get(`${ipofserver}admin/getAllApplication`)
      // .then(res => res.json())
      .then(data => {
        // console.log(data.data)
        setHospitals(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const [show, setShow] = useState(false);
  const handleClose = event => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const [inputField, setInputField] = useState({
    tax: '',
    duedate: '',
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
      tax: '',
      duedate: '',
    });
  }

  const CalculateButton = (event, formdata, mob, email) => {
    setTaxdata(formdata)
    axios.get(`${ipofserver}admin/doesUserExist/${formdata.username}`)
      .then(data => {
        setIsVerifyData(data.data)
      })
      .catch(err => {
        console.log(err);
      })
    handleShow()
  }

  const handleSubmit = async () => {
    if (inputField.tax == '' || inputField.duedate == '') {
      alert("Please enter all details !")
    }
    else {
      const updatedDict = { ...taxdata, ['taxamount']: inputField.tax, ['duedate']: inputField.duedate };
      console.log(updatedDict)
      axios.post(ipofserver + 'admin/verifyUser', updatedDict)
        .then(function (response) {
          if (response.data == "success") {
            alert("Verification done !")
            clearInput()
            setShow(false);
          }
          else {
            alert("Something went wrong !")
            clearInput()
            setShow(false);
          }
        })
        .catch(function (error) {
          return error;
        });
    }
  }

  const handleSubmit1 = async () => {
    console.log(taxdata)
    axios.post(ipofserver + 'admin/generateQR', taxdata)
      .then(function (response) {
        if (response.data == "success") {
          alert("Qr code generated !")
          setShow(false);
        }
        else {
          alert("Something went wrong !")
          setShow(false);
        }
      })
      .catch(function (error) {
        return error;
      });
  }

  const handleInputClick = (e) => {
    const value = parseFloat(taxdata.income);
    if (!isNaN(value)) {
      const result = value * 0.07;
      setInputField({
        tax: parseInt(result),
      });
    } else {
      setInputField({
        tax: 0,
      });
    }
  }

  return (
    <CoverLayout
      title="Calculate Tax"
      description="List of all applications">
      <div className="full-width-table-container">
        <table className="full-width-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Contact no.</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital, index) => (
              <tr key={index} style={{ fontSize: 17, color: 'black' }}>
                <td>{index + 1}</td>
                <td>{hospital.formdata.fname}</td>
                <td>{hospital.mobileNumber}</td>
                <td>{hospital.email}</td>
                <td>{hospital.formdata.address}</td>
                <td>
                  <SoftButton variant="gradient" color="info" onClick={event => CalculateButton(event, hospital.formdata, hospital.mobileNumber, hospital.email)} fullWidth>
                    Calculate
                  </SoftButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title">
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              Calculate Tax
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="tax-info-item">
              <strong>Full Name :</strong> {taxdata.fname}
            </div>
            <div className="tax-info-item">
              <strong>Tax Number :</strong> {taxdata.taxno}
            </div>
            <div className="tax-info-item">
              <strong>Date :</strong> {taxdata.sdate + ' - ' + taxdata.edate}
            </div>
            <div className="tax-info-item">
              <strong>Credits :</strong> {taxdata.credits}
            </div>
            <div className="tax-info-item">
              <strong>Filling Status :</strong> {taxdata.fillingstatus}
            </div>
            <div className="tax-info-item">
              <strong>Income :</strong> {taxdata.income}
            </div>
            <div className="tax-info-item">
              <strong>Account Number :</strong> {taxdata.accnumber}
            </div>
            <div className="tax-info-item">
              <strong>Sign :</strong> <img src={ipofserver + taxdata.file} alt="Placeholder" width={150} height={50} />
            </div>
            {!isVerify ? (
              <SoftBox>
                <SoftBox mt={2}>
                  <SoftInput type="number" placeholder="Enter Calculate tax" name="tax" value={inputField.tax}
                    onChange={inputsHandler} onClick={handleInputClick}/>
                </SoftBox>
                <SoftBox mt={2}>
                  <SoftInput type="date" placeholder="Select Due date" name="duedate" value={inputField.duedate}
                    onChange={inputsHandler} />
                </SoftBox>
                <SoftBox mt={2}>
                  <SoftButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                    Verify
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <SoftButton variant="gradient" color="info" onClick={handleClose}>
              Cancle
            </SoftButton>
            {isVerify ? (
              <SoftButton variant="gradient" color="info" onClick={handleSubmit1}>
                Generate QR
              </SoftButton>
            ) : null}
          </Modal.Footer>
        </Modal>
      </div>
    </CoverLayout>
  );
}

export default AdminDashboard;
