/**
 * HobbyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addhobby: async function(req, res) {
    let data = req.body;
    if (data.title.trim().length !== 0 && data.owner.trim().length !== 0) {
      const user = await Test.findOne(data.owner);
      if (!user) {
        return res.json(404, "User not found");
      }
      const hobby = Hobby.findOrCreate(
        {
          title: data.title,
          owner: data.owner
        },
        {
          title: data.title.trim(),
          owner: data.owner.trim()
        },
        (err, newHobby) => {
          if (err) {
            res.json({
              message: "Hobby could not be added"
            });
          }

          if (newHobby) {
            return res.json({
              message: "New hobby",
              data: newHobby
            });
          }
        }
      );
    }
  },
  viewHobby: async function(req, res) {}
};
