/* eslint-disable handle-callback-err */
/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addtest: async function(req, res) {
    const data = req.body;
    const createTest = await Test.findOrCreate(
      {
        name: data.name,
        email: data.email,
        phone: data.phone
      },
      {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim()
      },
      (err, result) => {
        if (err) {
          return res.json({
            message: "Something went wrong"
          });
        }
        return res.json({
          status: "Good",
          result: result
        });
      }
    );
  }
};
