import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';

const PortfolioScreen = () => {
  return (
    <>
      <Row className='mb-2'>
        <Col xs={12} md={6}>
          <Image
            src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/51e7b2350157397e300801ac291b9d81'
            fluid
          />
        </Col>
        <Col className='mt-4'>
          <Image
            src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/0612e6742e0a7877073e2a839948a9b8'
            fluid
          />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Image
            src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/5684fd4b32b1751d07260b1bad4362e6'
            fluid
          />
        </Col>
        <Col xs={12} md={6}>
          <Image
            src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/edb6d45f5802f300f183162490612de4'
            fluid
          />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Image
            src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/94dd4b3dedd315d69b35150c3d8adec4'
            fluid
          />
        </Col>

        <Col>
          <Image
            src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/e7d7d7cb94e4fc40f42468ad36fc92c8'
            fluid
          />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Image
            src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/0463aab5974cbef7c941f657ec5dffc2'
            fluid
          />
        </Col>
        <Col>
          <Image
            src='https://mint-made-ecommerce-template.s3.eu-west-2.amazonaws.com/77836806a1102959124f1a528e7f1c4f'
            fluid
          />
        </Col>
      </Row>
    </>
  );
};

export default PortfolioScreen;
