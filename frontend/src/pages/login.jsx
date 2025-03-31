import React from 'react';

function Login() {
  return (
    <div style={styles.container}>
      
      {/* Left section - Black with dollar sign */}
      <div style={styles.leftSection}>
        <div style={styles.coinOuter}>
          <div style={styles.coinInner}>
            <span style={styles.dollarSign}>$</span>
          </div>
          <div style={styles.coinDots}></div>
        </div>
      </div>
      
      {/* Right section - Light gray with BELLAGIO text */}
      <div style={styles.rightSection}>
        <h1 style={styles.blackText}>MIRAGE </h1>
        <h1 style={styles.redText}>BELLAGIO</h1>
        <h1 style={styles.blackText}>MGM GRAND</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    position: 'relative',
  },
  saveButtonContainer: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    zIndex: 10,
  },
  saveButton: {
    backgroundColor: 'black',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '9999px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  folderIcon: {
    marginRight: '8px',
  },
  leftSection: {
    width: '33.333%',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinOuter: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    border: '4px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  coinInner: {
    width: '170px',
    height: '170px',
    borderRadius: '50%',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinDots: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    borderRadius: '50%',
    border: '4px dotted white',
  },
  dollarSign: {
    color: 'white',
    fontSize: '80px',
    fontWeight: 'bold',
  },
  rightSection: {
    width: '66.667%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackText: {
    color: 'black',
    fontSize: '80px',
    fontWeight: '900',
    margin: '10px 0',
    fontFamily: 'Arial, sans-serif',
  },
  redText: {
    color: '#b22222',
    fontSize: '80px',
    fontWeight: '900',
    margin: '10px 0',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Login;