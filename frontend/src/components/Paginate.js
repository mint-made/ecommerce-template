import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  category = '',
  subCategory = '',
  keyword = '',
}) => {
  const generateLink = (x) => {
    if (isAdmin) {
      return `/admin/productlist/${x + 1}`;
    }
    if (!category) {
      return keyword
        ? `shop/search/${keyword}/page/${x + 1}`
        : `shop/page/${x + 1}`;
    }
    if (!subCategory && category) {
      return keyword
        ? `shop/${category}/search/${keyword}/page/${x + 1}`
        : `shop/${category}/page/${x + 1}`;
    }
    if (subCategory && category) {
      return keyword
        ? `shop/${category}/${subCategory}/search/${keyword}/page/${x + 1}`
        : `shop/${category}/${subCategory}/page/${x + 1}`;
    }
    console.log('error: ', category, subCategory, keyword);
    return '';
  };

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={generateLink(x)}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
