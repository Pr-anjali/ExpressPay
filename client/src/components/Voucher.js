import React, { useState, useEffect } from 'react';
import '../styles/Voucher.css';
import voucherImage from '../images/voucher.png';
import axios from 'axios';
import CouponPage from './CouponPage';

const Voucher = () => {
  const [receiverName, setReceiverName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    if (couponData) {
      fetchBarcode();
      fetchQRCode();
    }
  }, [couponData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const data = {
      receiverName,
      mobileNumber,
      amount,
      expiryDate,
      purpose
    };

    setCouponData(data);
  };

  const generateUniqueIdentifier = () => {
    // Generate a unique identifier for QR code
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const fetchBarcode = () => {
    // Placeholder URL for fetching barcode
    const barcodeUrl = 'https://example-api.com/barcode/' + generateUniqueIdentifier(); // Replace with your actual barcode generation API

    axios
      .get(barcodeUrl)
      .then((response) => {
        setBarcode(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchQRCode = () => {
    // Placeholder URL for fetching QR code
    const qrCodeUrl = 'https://example-api.com/qrcode/' + generateUniqueIdentifier(); // Replace with your actual QR code generation API

    axios
      .get(qrCodeUrl)
      .then((response) => {
        setQrCode(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="voucher-container">
      <h2 className="voucher-heading">Voucher</h2>
      <div className="voucher-inner-container">
        <form className="voucher-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="Receiver's Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (Max: 100000)"
              max={100000}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="Expiry Date (Max: 1 year)"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose"
              required
            />
          </div>
          <button type="submit" className="voucher-submit-btn">
            Submit
          </button>
        </form>
      </div>
      <img src={voucherImage} alt="Voucher" className="voucher-image" />
      {couponData && (
        <CouponPage
          name={receiverName}
          amount={amount}
          purpose={purpose}
          expiryDate={expiryDate}
          barcode={barcode}
          qrCode={qrCode}
        />
      )}
    </div>
  );
};

export default Voucher;
