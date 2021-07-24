import React, { useState } from 'react';
import { Button, Carousel, Container, Image } from 'react-bootstrap';

const ProductImages = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {images.map((image, index) => (
        <Button className='ml-1' onClick={() => setIndex(index)}>
          Go to image {index + 1}
        </Button>
      ))}
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <Container fluid>
              <Image src={image} fluid className='rounded-0 m-0 p-0' />
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductImages;
