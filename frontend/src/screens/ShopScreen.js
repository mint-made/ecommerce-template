import React, { useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {
  const location = useLocation();
  console.log(location);

  const category = match.params.category;
  const subCategory = match.params.subCategory;
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    console.log(
      'page: ',
      pageNumber,
      'cat: ',
      category,
      'sub-cat: ',
      subCategory
    );
    dispatch(listProducts(keyword, pageNumber, category, subCategory));
  }, [dispatch, pageNumber]);

  // const capitalize = (s) => {
  //   if (typeof s !== 'string') return '';
  //   return s.charAt(0).toUpperCase() + s.slice(1);
  // };

  return (
    <>
      <Meta />

      <Breadcrumb>
        <Breadcrumb.Item href='/shop'>Shop</Breadcrumb.Item>
      </Breadcrumb>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            category={category ? category : ''}
            subCategory={subCategory ? subCategory : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
