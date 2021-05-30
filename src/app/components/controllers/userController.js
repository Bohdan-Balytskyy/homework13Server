const User = require('../models/user');

class Error1 {
    constructor(err) {
        this.code = err.name;
        this.description = err.message;
    }
}

exports.create = async function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length < 3) {
    res.status(400).json({ code: 'myError', description: 'Please provide all required field' });
  } else {
    try {
      const checkAddYser = await User.checkEmail(req.body);
      if (checkAddYser[0]) {
        res.status(400).json({ code: 'myError', description: 'User with this email has already existed' });
      } else {
        User.create(req.body, function (err, record) {
          res.status(201).json({ result: 'Ok' });
        });
      }  
    }
    catch (err) {
      res.json(new Error1(err));
    }
  }
};

exports.update = async function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length < 3) {
    res.status(400).json({ code: 'myError', description: 'Please provide all required field' });
  } else {
    try {
      const checkPutUser = await User.checkEmail(req.body);
      if (checkPutUser[0] && (checkPutUser[0].id !== +req.params.id)) {
        res.status(400).json({ code: 'myError', description: 'User with this changed email has already existed'});
      } else {
        User.update(req.params.id, req.body, function (err, record) {
          res.status(200).json({ result: 'Ok' });
        });
      }
    }
    catch (err) {
      res.json(new Error1(err));
    }
  }
};

exports.getAll = function (req, res) {
  try{
    User.getAll(function (err, record) {
      res.status(200).json(record);
    });
  }  
  catch (err) {
      res.json(new Error1(err));
  }
};

exports.getById = function (req, res) {
  try {
    User.getById(req.params.id, function (err, record) {
      res.status(200).json(record);
    });
  }
  catch (err) {
    res.json(new Error1(err));
  }
};

exports.delete = function (req, res) {
  try {
    User.delete(req.params.id, function (err, record) {
      res.status(200).json({Result: 'Delete_success'});
    });
  }
    catch (err) {
    res.json(new Error1(err));
  }
};