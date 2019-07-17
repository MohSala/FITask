/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // orders: {
    //   collection: "order",
    //   via: "products"
    // },
    name: {
      type: "string",
      required: true
    },
    quantity: {
      type: "number",
      required: true
    },
    price: {
      type: "number",
      required: true
    },
    order: {
      model: "order"
    }
  }
};
