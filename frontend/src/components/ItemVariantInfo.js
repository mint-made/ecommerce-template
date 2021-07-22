import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Returns an overview of the product + variant details that the customer has selected
 * This can be displayed in Cart, Place Order & OrderScreen
 * @param {Object} item The item object of the selected Item + variant options
 */

const ItemVariantInfo = ({ item }) => {
  console.log(item);
  return (
    <>
      <Link to={`/product/${item._id}`}>
        {item.name} - £{item.price}
      </Link>
      {item.variantId && (
        <>
          <hr className='my-2' />
          {item.variations &&
            item.variations.map((variation, index) => (
              <p className='m-1' key={`variation-${index}`}>
                {variation.name + ': '}
                {variation.options[variation.selectedOption].name}
                {' (+£' +
                  variation.options[variation.selectedOption].additionalPrice +
                  ')'}
              </p>
            ))}
          {item.personalizations &&
            item.personalizations.map((personalization, index) => (
              <p key={index}>
                {personalization.name + ': '}
                {personalization.value}
                {' (+£' + personalization.additionalPrice + ')'}
              </p>
            ))}
          <hr className='my-2' />
          Total: £{item.totalPrice}
        </>
      )}
    </>
  );
};

export default ItemVariantInfo;
