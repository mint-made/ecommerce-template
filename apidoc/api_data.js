define({ "api": [
  {
    "type": "delete",
    "url": "/api/products/:id",
    "title": "deleteProduct",
    "group": "Private/Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ID",
            "description": "<p>of the product to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Product removed&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/productController.js",
    "groupTitle": "Private/Admin",
    "name": "DeleteApiProductsId"
  },
  {
    "type": "get",
    "url": "/api/orders/",
    "title": "getOrders",
    "group": "Private/Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "orders",
            "description": "<p>All orders</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/orderController.js",
    "groupTitle": "Private/Admin",
    "name": "GetApiOrders"
  },
  {
    "type": "get",
    "url": "/api/orders/:id/deliver",
    "title": "updateOrderToDelivered",
    "group": "Private/Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>ID of the order to be marked as delivered</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "order",
            "description": "<p>Order that has been updated as delivered</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/orderController.js",
    "groupTitle": "Private/Admin",
    "name": "GetApiOrdersIdDeliver"
  },
  {
    "type": "post",
    "url": "/api/products/",
    "title": "createProduct",
    "group": "Private/Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Empty Object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>A template product created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/productController.js",
    "groupTitle": "Private/Admin",
    "name": "PostApiProducts"
  },
  {
    "type": "put",
    "url": "/api/products/:id",
    "title": "updateProduct",
    "group": "Private/Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "countInStock",
            "description": "<p>of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "variations",
            "description": "<p>of the product</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>An object of the updated product</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/productController.js",
    "groupTitle": "Private/Admin",
    "name": "PutApiProductsId"
  },
  {
    "type": "get",
    "url": "/api/orders/:id",
    "title": "getOrderById",
    "group": "Private",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>ID of the order requested</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "order",
            "description": "<p>The order with given ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/orderController.js",
    "groupTitle": "Private",
    "name": "GetApiOrdersId"
  },
  {
    "type": "get",
    "url": "/api/orders/:id/pay",
    "title": "updateOrderToPaid",
    "group": "Private",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>ID of the order that has been paid</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "order",
            "description": "<p>The order with payment details added</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/orderController.js",
    "groupTitle": "Private",
    "name": "GetApiOrdersIdPay"
  },
  {
    "type": "get",
    "url": "/api/orders/myorders",
    "title": "getMyOrders",
    "group": "Private",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "orders",
            "description": "<p>The orders for the user who sent the request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/orderController.js",
    "groupTitle": "Private",
    "name": "GetApiOrdersMyorders"
  },
  {
    "type": "post",
    "url": "/api/orders",
    "title": "addOrderItems",
    "group": "Private",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "orderItems",
            "description": "<p>All items included in the order</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "shippingAddress",
            "description": "<p>Containing address , city, postalCode, country</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "paymentMethod",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "itemsPrice",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "shippingPrice",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "taxPrice",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "totalPrice",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "createdOrder",
            "description": "<p>The order created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/orderController.js",
    "groupTitle": "Private",
    "name": "PostApiOrders"
  },
  {
    "type": "post",
    "url": "/api/products/:id",
    "title": "createProductReview",
    "group": "Private",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>review rating</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>review comment</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "product",
            "description": "<p>A template product created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/productController.js",
    "groupTitle": "Private",
    "name": "PostApiProductsId"
  },
  {
    "type": "get",
    "url": "/api/products",
    "title": "getProducts",
    "group": "Public",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Keyword",
            "description": "<p>to search the database</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Page",
            "description": "<p>number of the results</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Array",
            "description": "<p>of Products</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Page",
            "description": "<p>number of results that is being returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Pages",
            "description": "<p>Total number of pages of results</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/productController.js",
    "groupTitle": "Public",
    "name": "GetApiProducts"
  },
  {
    "type": "get",
    "url": "/api/products/:id",
    "title": "getProductById",
    "group": "Public",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ID",
            "description": "<p>of the product to be returned</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>Single Product with that ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/productController.js",
    "groupTitle": "Public",
    "name": "GetApiProductsId"
  },
  {
    "type": "get",
    "url": "/api/products/top",
    "title": "getTopProducts",
    "group": "Public",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "products",
            "description": "<p>The top 3 rated products</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/productController.js",
    "groupTitle": "Public",
    "name": "GetApiProductsTop"
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "deleteUser",
    "group": "User",
    "permission": [
      {
        "name": "Private/Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>_id of the user to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User removed&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/userController.js",
    "groupTitle": "User",
    "name": "DeleteApiUsersId"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "getUsers",
    "group": "User",
    "permission": [
      {
        "name": "Private/Admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Returns all users</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/userController.js",
    "groupTitle": "User",
    "name": "GetApiUsers"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "getUserById",
    "group": "User",
    "permission": [
      {
        "name": "Private/Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>_id of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>All of the users information ex. password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/userController.js",
    "groupTitle": "User",
    "name": "GetApiUsersId"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "registerUser",
    "group": "User",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name submitted by the user creating an account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email submitted by the user creating an account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password submitted by the user creating an account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>Does the user have admin rights? Defaults to false</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token created with JWT for the user to access Private routes</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/userController.js",
    "groupTitle": "User",
    "name": "PostApiUsers"
  },
  {
    "type": "post",
    "url": "/api/users/login",
    "title": "authUser",
    "group": "User",
    "permission": [
      {
        "name": "Public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email submitted by the user trying to log in</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password submitted by the user trying to log in</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>Does the user have admin rights?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token created with JWT for the user to access Private routes in the site</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/userController.js",
    "groupTitle": "User",
    "name": "PostApiUsersLogin"
  },
  {
    "type": "post",
    "url": "/api/users/profile",
    "title": "getUserProfile",
    "group": "User",
    "permission": [
      {
        "name": "Private"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>Does the user have admin rights?</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/userController.js",
    "groupTitle": "User",
    "name": "PostApiUsersProfile"
  },
  {
    "type": "put",
    "url": "/api/users/:id",
    "title": "updateUser",
    "group": "User",
    "permission": [
      {
        "name": "Private/Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>updated name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>updated email of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>updated admin status of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>_id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>updated name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>updated email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>updated admin status of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/userController.js",
    "groupTitle": "User",
    "name": "PutApiUsersId"
  },
  {
    "type": "put",
    "url": "/api/users/profile",
    "title": "updateUserProfile",
    "group": "User",
    "permission": [
      {
        "name": "Private"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>updated name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>updated email of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>updated password of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>_id of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>updated name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>updated email of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>Does the user have admin rights?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token created with JWT for the user to access Private routes</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/userController.js",
    "groupTitle": "User",
    "name": "PutApiUsersProfile"
  }
] });
