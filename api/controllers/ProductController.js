/* eslint-disable handle-callback-err */
/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addProduct: async function(req, res) {
    const data = req.body;
    if (
      data.name.trim().length !== 0 &&
      data.quantity.trim().length !== 0 &&
      data.price.trim().length !== 0
      //   &&
      //   data.order.trim().length !== 0
    ) {
      const createProduct = await Product.findOrCreate(
        {
          name: data.title,
          quantity: data.quantity,
          price: data.price,
          order: data.order
        },
        {
          name: data.name.trim(),
          quantity: data.quantity.trim(),
          price: data.price.trim(),
          order: data.order.trim()
        },
        (err, result) => {
          if (err) {
            return res.json({
              status: "Error",
              error: "Something went wrong" + console.log(err)
            });
          }
          return res.json({
            status: "Success",
            message: "Product added Successfully",
            data: result
          });
        }
      );
    }
  },
  viewProducts: async function(req, res) {
    const data = req.param("orderId");

    const products = await Product.find().populate("order", {
      where: {
        id: data.order
      }
    });
    if (!products) {
      return res.json({
        status: "Error",
        error: "Something went wrong"
      });
    }
    return res.json({
      status: "Success",
      data: products
    });
  }
};
