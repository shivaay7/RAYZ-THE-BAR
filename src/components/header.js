
import React from 'react';
import razorpayLogo from '../Screenshot_2024-09-12_at_4.30.57_PM-removebg-preview.png'; 

const Header = () => {
  const headerStyle = {
    marginTop: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '20px',
    backgroundColor: '#007bff', 
    padding: '10px 20px',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '7px',
    marginBottom: '-8px'
  };

  const titleStyle = {
    fontSize: '1.2em'
  };

  return (
    <header style={headerStyle}>
      <img 
        src={razorpayLogo} 
        alt="Razorpay Logo" 
        style={{ width: '150px', height:' 30px' }} 
      />
      <div style={titleStyle}>Billing System</div>
    </header>
  );
};

export default Header;
