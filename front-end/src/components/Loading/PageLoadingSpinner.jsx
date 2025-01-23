import React from 'react'

function PageLoadingSpinner({ caption }) {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      gap: '8px',
      flexDirection: 'column' // Để CircularProgress và Typography xếp chồng lên nhau
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3', // Viền nhạt
      borderTop: '4px solid #3498db', // Viền nổi bật
      borderRadius: '50%',
      animation: 'spin 1s linear infinite', // Thêm hiệu ứng xoay
    },
    caption: {
      fontSize: '16px',
      color: '#333'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <div style={styles.caption}>{caption}</div>
    </div>
  )
}

export default PageLoadingSpinner
