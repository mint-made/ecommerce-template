import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

// @description Create new order
// @route POST /api/orders
// @access Private
/**
 * @api {post} /api/orders addOrderItems
 * @apiGroup Order
 * @apiPermission Private
 *
 * @apiDescription This route will create a new order, made up of the order items passed in the body
 *
 * @apiParam {Array} orderItems All items included in the order
 * @apiParam {Object} shippingAddress Containing address , city, postalCode, country
 * @apiParam {String} paymentMethod
 * @apiParam {Number} itemsPrice
 * @apiParam {Number} shippingPrice
 * @apiParam {Number} taxPrice
 * @apiParam {Number} totalPrice
 *
 *
 * @apiSuccess {Object} createdOrder The order created
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @description Get order by ID
// @route GET /api/orders/:id
// @access Private
/**
 * @api {get} /api/orders/:id getOrderById
 * @apiGroup Order
 * @apiPermission Private
 *
 * @apiParam {String} orderId ID of the order requested
 *
 *
 * @apiSuccess {Object} order The order with given ID
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @description Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
/**
 * @api {get} /api/orders/:id/pay updateOrderToPaid
 * @apiGroup Order
 * @apiPermission Private
 *
 * @apiParam {String} orderId ID of the order that has been paid
 *
 *
 * @apiSuccess {Object} order The order with payment details added
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @description Place new order
// @route POST /api/orders
// @access Private
/**
 * @api {post} /api/orders/place Place Order
 * @apiGroup Order
 * @apiPermission Private
 *
 * @apiDescription This route will create a new paid order from details provided
 *
 * @apiParam {Array} orderItems All items included in the order
 * @apiParam {Object} shippingAddress Containing address , city, postalCode, country
 * @apiParam {String} paymentMethod
 * @apiParam {Number} itemsPrice
 * @apiParam {Number} shippingPrice
 * @apiParam {Number} taxPrice
 * @apiParam {Number} totalPrice
 * @apiParam {Object} paymentResult
 *
 * @apiSuccess {Object} createdOrder The order created
 */
const placeOrder = asyncHandler(async (req, res) => {
  console.log('hit');
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentResult,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: paymentResult.id,
        status: paymentResult.status,
        update_time: paymentResult.update_time,
        email_address: paymentResult.payer.email_address,
      },
    });

    const placedOrder = await order.save();

    res.status(201).json(placedOrder);
  }
});

// @description Get logged in user order
// @route GET /api/orders/myorders
// @access Private
/**
 * @api {get} /api/orders/myorders getMyOrders
 * @apiGroup Order
 * @apiPermission Private
 *
 * @apiSuccess {Array} orders The orders for the user who sent the request
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @description Get all orders
// @route GET /api/orders/
// @access Private/Admin
/**
 * @api {get} /api/orders/ getOrders
 * @apiGroup Order
 * @apiPermission Private/Admin
 *
 * @apiSuccess {Array} orders All orders
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'id name');
  res.json(orders);
});

// @description Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
/**
 * @api {get} /api/orders/:id/deliver updateOrderToDelivered
 * @apiGroup Order
 * @apiPermission Private/Admin
 *
 * @apiParam {String} orderId ID of the order to be marked as delivered
 *
 * @apiSuccess {Object} order Order that has been updated as delivered
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  placeOrder,
};
