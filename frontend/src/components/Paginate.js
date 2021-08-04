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
    return !category
      ? `/shop/page/${x + 1}`
      : !subCategory
      ? `/shop/${category}/page/${x + 1}`
      : category && subCategory
      ? `/shop/${category}/${subCategory}/page/${x + 1}`
      : '';
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
