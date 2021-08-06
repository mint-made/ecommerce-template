import axios from 'axios';
import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import Loader from '../components/Loader';

const S3Upload = () => {
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/s3', formData, config);

      setImage(data);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
  };

  return (
    <div>
      <h3>Upload an image to S3</h3>
      <p className='mb-2'>Image</p>
      <Form.Group
        controlId='image'
        className='border-bottom border-secondary rounded'
      >
        <Form.Control
          type='text'
          placeholder='Enter image URL'
          className='border-0'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></Form.Control>
        <hr className='m-0' />
        <Form.File
          id='image-file'
          label='Choose File'
          custom
          onChange={uploadFileHandler}
        ></Form.File>
        {uploading && <Loader />}
      </Form.Group>

      <Image
        src={image}
        rounded
        fluid
        style={{ maxHeight: '150px', maxWidth: '150px' }}
      />
    </div>
  );
};

export default S3Upload;
