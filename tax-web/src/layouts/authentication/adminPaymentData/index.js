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

  useEffect(() => {
    axios.get(`${ipofserver}admin/getPaymentData`)
      // .then(res => res.json())
      .then(data => {
        console.log(data.data)
        setHospitals(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <CoverLayout
      title="Payment data"
      description="List of all Payment done">
      <div className="full-width-table-container">
        <table className="full-width-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Account no.</th>
              <th>Tax no.</th>
              <th>Income</th>
              <th>Due amount</th>
              <th>Transaction id</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital, index) => (
              <tr key={index} style={{ fontSize: 17, color: 'black' }}>
                <td>{index + 1}</td>
                <td>{hospital.fname}</td>
                <td>{hospital.accnumber}</td>
                <td>{hospital.taxno}</td>
                <td>{hospital.income}</td>
                <td>{hospital.taxamount}</td>
                <td>{hospital.transactionid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CoverLayout>
  );
}

export default AdminDashboard;
