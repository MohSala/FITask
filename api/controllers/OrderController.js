/* eslint-disable quotes */
/* eslint-disable handle-callback-err */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createorder: async function(req, res) {
    const data = req.body;
    if (data.name.trim().length !== 0 && data.owner.trim().length !== 0) {
      const user = await User.findOne(data.owner);
      if (!user) {
        return res.json({
          status: "Error",
          error: "User not found"
        });
      }
      const order = Order.findOrCreate(
        {
          name: data.name,
          owner: data.owner
        },
        {
          name: data.name.trim(),
          owner: data.owner.trim()
        },
        (err, result) => {
          if (err) {
            return res.json({
              status: "Error",
              error: "Something went wrong"
            });
          }
          if (result) {
            return res.json({
              status: "Success",
              data: result,
              message: "Order created successfully, add products!"
            });
          }
        }
      );
    }
  }

  //   viewOrders: function(req, res) {
  //     Order.find({}).exec((err, orders) => {
  //       if (err) {
  //         res.json({
  //           status: "Error",
  //           error: "Something went wrong"
  //         });
  //       }
  //       res.json({
  //         status: "Success",
  //         data: orders
  //       });
  //     });
  //   }
};
