import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({
  title = '',
  description,
  keywords,
  brand,
  showBrand = true,
}) => {
  const generateTitle = () => {
    return !title ? brand : showBrand ? `${title} - ${brand}` : title;
  };
  return (
    <Helmet>
      <title>{generateTitle()}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  brand: 'TC Graphics',
  description: 'Hand-Made Products and graphics',
  keywords: 'cards, prints, stationery, t-shirts, art ',
};

export default Meta;
