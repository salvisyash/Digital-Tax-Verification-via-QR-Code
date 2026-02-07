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

// Tax verification React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Tax verification React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Tax verification React base styles
import Card from "@mui/material/Card";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ipofserver } from 'global';
import SoftButton from "components/SoftButton";

import StripeCheckout from 'react-stripe-checkout';

function Dashboard() {

  const [userdata, setUserdata] = useState({});
  const [btntxt, setBtntxt] = useState('Read QR code');
  const [qrdata, setQrdata] = useState([]);

  useEffect(() => {
    axios.get(`${ipofserver}users/getTaxInfoFromUsername/${localStorage.getItem('LoginUsername')}`)
      .then(data => {
        setUserdata(data.data);
      })
      .catch(err => {
        console.log(err);
        setUserdata([]);
      })

  }, [])

  const [show, setShow] = useState(false);

  const CalculateButton = async (event, qrpath) => {
    if (btntxt == 'Close') {
      setShow(false)
      setBtntxt('Read QR code')
    }
    else {

      const formData = new FormData();

      formData.append('qrpath', qrpath);
      const res = await axios.post(`${ipofserver}users/readQRCode`, formData);

      console.log(res);

      setQrdata(res.data.split('|'))

      setShow(true)
      setBtntxt('Close')
    }
  }

  const handlePayment = async (token) => {
    console.log('-----------------------------------------');
    console.log(token.id);
    console.log('-----------------------------------------');
    const formData = new FormData();

    formData.append('tokenid', token.id);
    formData.append('username', localStorage.getItem('LoginUsername'));
    formData.append('fname', qrdata[0]);
    formData.append('taxno', qrdata[1]);

    console.log(formData)
    const res = await axios.post(`${ipofserver}users/updatePayment`, formData);

    if (res.data == "success") {
      alert("Payment successfull with transaction id "+ token.id)      
      setShow(false)
      setBtntxt('Read QR code')
    }
    else {
      alert("Something went wrong !")
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h3">View Tax Details</SoftTypography>
          </SoftBox>
          <SoftBox style={{ textAlign: 'center' }}>
            {Object.keys(userdata).length > 0 && userdata.qrpath != 'None' ? (
              <div style={{ marginBottom: 50 }}>
                <img src={ipofserver + userdata.qrpath} alt="Placeholder" width={250} height={250} style={{ display: 'block', margin: '0 auto' }} />
                <p style={{ color: 'black', fontSize: 25, marginTop: 5 }}>{'Tax no : ' + userdata.taxno}</p>

                <SoftButton variant="gradient" color="info" onClick={event => CalculateButton(event, userdata.qrpath)}>
                  {btntxt}
                </SoftButton>
              </div>
            ) : (
              <div style={{ marginBottom: 50 }}>
                <img src={ipofserver + 'preview.png'} alt="Placeholder" width={200} height={200} style={{ display: 'block', margin: '0 auto' }} />
                <p style={{ color: 'black', fontSize: 25, marginTop: 5 }}>{'Not applicable'}</p>
              </div>
            )}
          </SoftBox>
          {show ? (
            <SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h3">Pay Now</SoftTypography>
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                <div className="tax-info-item" style={{ marginLeft: 50 }}>
                  <strong>Full name :</strong> {qrdata[0]}
                </div>
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                <div className="tax-info-item" style={{ marginLeft: 50 }}>
                  <strong>Tax Number :</strong> {qrdata[1]}
                </div>
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                <div className="tax-info-item" style={{ marginLeft: 50 }}>
                  <strong>Income :</strong> {qrdata[2]}
                </div>
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                <div className="tax-info-item" style={{ marginLeft: 50 }}>
                  <strong>Due date :</strong> {qrdata[3]}
                </div>
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                <div className="tax-info-item" style={{ marginLeft: 50 }}>
                  <strong>Tax due amount :</strong> {qrdata[4]}
                </div>
              </SoftBox>
              {userdata.transactionid != 'None' ? (
                <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                  <div className="tax-info-item" style={{ marginLeft: 50 , marginBottom: 25}}>
                    <strong>Transaction Id :</strong> {userdata.transactionid}
                  </div>
                </SoftBox>
              ) : null}
              {userdata.transactionid == 'None' ? (
                <SoftBox justifyContent="space-between" style={{ alignItems: 'center', justifyContent: 'center', width: 400, marginLeft: 200, marginTop: 25, marginBottom: 25 }}>
                  <StripeCheckout
                    token={handlePayment}
                    stripeKey="pk_test_51Mo3OJSDM2aTW7qpSQiAmFup231FtplENwgKPRyvS0nE88TC80Q4PRRAhe1ZtN7nPMdEenjUq0c9nAaQutqMFmw800z66Qqi9e"
                    name="Tax payment"
                    description="What's In Your Tax?"
                    amount={qrdata[4] * 100} // The amount is in cents (e.g., $9.99)
                    currency="INR"
                    // image={brand} // Replace with your logo URL
                    shippingAddress
                    billingAddress
                  />
                </SoftBox>
              ) : null}
            </SoftBox>
          ) : null}
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
