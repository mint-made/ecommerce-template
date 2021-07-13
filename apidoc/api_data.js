define({ "api": [
  {
    "type": "get",
    "url": "/api/products",
    "title": "Get Products",
    "name": "GetProducts",
    "group": "User",
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
            "field": "Page:",
            "description": "<p>Page Number of results that is being returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Pages:",
            "description": "<p>Total number of pages of results</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"firstname\": \"John\",\n  \"lastname\": \"Doe\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/tom/Desktop/ecommerce-template/backend/controllers/productController.js",
    "groupTitle": "User"
  }
] });
