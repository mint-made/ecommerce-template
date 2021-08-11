import React, { useEffect } from 'react';
import { Row, Col, Breadcrumb, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const HomeScreen = ({ match, history }) => {
  const location = useLocation();
  const category = match.params.category;
  const subCategory = match.params.subCategory
    ? match.params.subCategory.replace(/-/g, ' ')
    : '';
  const keyword = useQuery().get('q') || '';
  const pageNumber = useQuery().get('page') || 1;
  const sortBy = useQuery().get('sort_by') || '';

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(
      listProducts(keyword, pageNumber.toString(), category, subCategory)
    );
  }, [dispatch, pageNumber, category, subCategory, keyword]);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    const sArr = s.split(' ').map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    });
    return sArr.join(' ');
  };

  const sortSelectHandler = (value) => {
    history.push(`${location.pathname}?sort=${value}`);
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
            ? `${capitalize(category)}`
            : 'Shop'
        }
      />
      <Row>
        <Col>
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
        </Col>
        <Col>
          <Form.Control
            as='select'
            className='form-select border border-secondary rounded'
            style={{ maxWidth: '160px' }}
            value={sortBy}
            onChange={(e) => sortSelectHandler(e.target.value)}
          >
            Sort By:
            <option value={'date_desc'}>Most Recent</option>
            <option value={'price_asc'}>Lowest Price</option>
            <option value={'price_desc'}>Highest Price</option>
          </Form.Control>
        </Col>
      </Row>

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
