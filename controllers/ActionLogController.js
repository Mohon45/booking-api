

  const { httpResponse } = require("../utils/httpResponse");
  const ActionLogService = require("../services/ActionLog.service");
  
  module.exports.get_actionlog_list = async (req, res) => {
    try {
      let query = req.query;
  
      await ActionLogService.getAll(query).then((response) => {
        res.send(httpResponse("success", response, "ActionLog List found"));
      });
    } catch (error) {
      res.status(500).json(httpResponse("fail", {}, error.message));
    }
  };
  
  module.exports.get_actionlog = async (req, res) => {
    try {
      const actionlog_id = req.params.id;
  
      await ActionLogService.getById(actionlog_id)  
        .then((response) => {
          res.send(httpResponse("success", response, 'ActionLog not found'));
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
      await ActionLogService.create(req.body)
        .then((response) => {
          res.send(httpResponse("success", response, "ActionLog created"));
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
      const actionlog_id = req.params.id;
  
      await ActionLogService.update(actionlog_id, req.body)
        .then((response) => {
          if (!response) {
            res.status(400).send(httpResponse("fail", {}, 'Cannot update actionlog'));
          } else {
            res.send(httpResponse("success", response, "ActionLog Updated!"));
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
      const actionlog_id = req.params.id;
  
      await ActionLogService.delete(actionlog_id)
        .then((data) => {
          if (!data) {
            res.status(400).send(httpResponse("fail", {}, 'Cannot delete actionlog'));
          } else {
            res.send(httpResponse("success", { actionlog_id: actionlog_id }, 'actionlog was deleted successfully'));
          }
        })
        .catch((err) => {
          res.status(500).send(httpResponse("fail", {}, err.message));
        });
    } catch (error) {
      res.status(500).json(httpResponse("fail", {}, error.message));
    }
  };
  
