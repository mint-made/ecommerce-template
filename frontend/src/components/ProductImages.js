import React from 'react';
import { Card, Carousel, Col, Container, Image, Row } from 'react-bootstrap';

const ProductImages = ({ images }) => {
  console.log(images);
  return (
    <Carousel pause='hover'>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <Container fluid>
            <Image src={image} fluid className='rounded-0 m-0 p-0' />
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductImages;
