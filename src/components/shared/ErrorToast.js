import React, { useState } from 'react';
import { Toast, Button } from 'react-bootstrap';

const ErrorToast = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Toast
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%',
        zIndex: '10000',
      }}
      show={show}
    >
      <div className='toast-text-container p-2 m-0'>
        <Toast.Body>
          There was an error to fetch the data from the server, please refresh
          the page
        </Toast.Body>
        <Button style={{ minWidth: '100px' }} onClick={handleClose}>
          ok
        </Button>
      </div>
    </Toast>
  );
};
export default ErrorToast;
