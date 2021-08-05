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
  const category = match.params.category;
  const subCategory = match.params.subCategory
    ? match.params.subCategory.replace(/-/g, ' ')
    : '';
  const keyword = useQuery().get('q') || '';
  const pageNumber = useQuery().get('page') || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category, subCategory));
  }, [dispatch, pageNumber, category, subCategory, keyword]);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    const sArr = s.split(' ').map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    });
    return sArr.join(' ');
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <>
      <Meta
        title={
          subCategory
            ? `${capitalize(category)} - ${capitalize(subCategory)}`
            : category
            ? `${capitalize(category)} - Pippa & Paper`
            : 'Shop - Pippa & Paper'
        }
        showBrand={false}
      />

      <Breadcrumb>
        <Breadcrumb.Item href='/shop'>Shop</Breadcrumb.Item>
        {category && (
          <Breadcrumb.Item href={`/shop/${category}`}>
            {capitalize(category)}
          </Breadcrumb.Item>
        )}
        {subCategory && (
          <Breadcrumb.Item href={`/shop/${category}/${subCategory}`}>
            {capitalize(subCategory)}
          </Breadcrumb.Item>
        )}
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
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
