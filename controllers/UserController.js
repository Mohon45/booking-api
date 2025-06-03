

  const { httpResponse } = require("../utils/httpResponse");
  const UserService = require("../services/User.service");
  
  module.exports.get_user_list = async (req, res) => {
    try {
      let query = req.query;
  
      await UserService.getAll(query).then((response) => {
        res.send(httpResponse("success", response, "User List found"));
      });
    } catch (error) {
      res.status(500).json(httpResponse("fail", {}, error.message));
    }
  };
  
  module.exports.get_user = async (req, res) => {
    try {
      const user_id = req.params.id;
  
      await UserService.getById(user_id)  
        .then((response) => {
          res.send(httpResponse("success", response, 'User not found'));
        })
        .catch((err) => {
          res.status(400).send(httpResponse("fail", {}, err.message));
        });
    } catch (error) {
      res.status(500).json(httpResponse("fail", {}, error.message));
    }
  };
  
  module.exports.create = async (req, res) => {
    if (!req.body) {
      res.status(400).json(httpResponse("fail", {}, "Content cannot be empty"));
      return;
    }
  
    try {
      await UserService.create(req.body)
        .then((response) => {
          res.send(httpResponse("success", response, "User created"));
        })
        .catch((err) => {
          res.status(400).send(httpResponse("fail", {}, err.message));
        });
    } catch (error) {
      res.status(500).json(httpResponse("fail", {}, error.message));
    }
  };
  
  module.exports.update = async (req, res) => {
    if (!req.body) {
      res.staus(400).json(httpResponse("fail", {}, "Content cannot be empty"));
    }
  
    try {
      const user_id = req.params.id;
  
      await UserService.update(user_id, req.body)
        .then((response) => {
          if (!response) {
            res.status(400).send(httpResponse("fail", {}, 'Cannot update user'));
          } else {
            res.send(httpResponse("success", response, "User Updated!"));
          }
        })
        .catch((err) => {
          res.status(500).send(httpResponse("fail", {}, err.message));
        });
    } catch (error) {
      res.status(500).json(httpResponse("fail", {}, error.message));
    }
  };
  
  module.exports.delete = async (req, res) => {
    try {
      const user_id = req.params.id;
  
      await UserService.delete(user_id)
        .then((data) => {
          if (!data) {
            res.status(400).send(httpResponse("fail", {}, 'Cannot delete user'));
          } else {
            res.send(httpResponse("success", { user_id: user_id }, 'user was deleted successfully'));
          }
        })
        .catch((err) => {
          res.status(500).send(httpResponse("fail", {}, err.message));
        });
    } catch (error) {
      res.status(500).json(httpResponse("fail", {}, error.message));
    }
  };
  
