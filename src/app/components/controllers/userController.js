const User = require('../models/user');

class CommonError {
    constructor(err) {
        this.code = err.name;
        this.description = err.message;
    }
}

class MyError {
    constructor(description) {
        this.code = 'myError';
        this.description = description;
    }
}

exports.create = async function (req, res) {
  if (!req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('email')
  || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('role')) {
    res.status(400).json(new MyError('Please provide all required field'));
  } else {
    try {
      const checkAddYser = await User.checkEmail(req.body);
      if (checkAddYser[0]) {
        res.status(400).json(new MyError('User with this email has already existed'));
      } else {
        User.create(req.body, function (err, record) {
          res.status(201).json({ result: 'Ok' });
        });
      }  
    }
    catch (err) {
      res.json(new CommonError(err));
    }
  }
};

exports.update = async function (req, res) {
  if (!req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('email')
  || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('role')) {
    res.status(400).json(new MyError('Please provide all required field'));
  } else {
    try {
      const checkPutUser = await User.checkEmail(req.body);
      if (checkPutUser[0] && (checkPutUser[0].id !== +req.params.id)) {
        res.status(400).json(new MyError('User with this changed email has already existed'));
      } else {
        User.update(req.params.id, req.body, function (err, record) {
          res.status(200).json({ result: 'Ok' });
        });
      }
    }
    catch (err) {
      res.json(new CommonError(err));
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
      res.json(new CommonError(err));
  }
};

exports.getById = function (req, res) {
  try {
    User.getById(req.params.id, function (err, record) {
      res.status(200).json(record);
    });
  }
  catch (err) {
    res.json(new CommonError(err));
  }
};

exports.delete = function (req, res) {
  try {
    User.delete(req.params.id, function (err, record) {
      res.status(200).json({Result: 'Delete_success'});
    });
  }
    catch (err) {
    res.json(new CommonError(err));
  }
};
exports.patch = function (req, res) {
  if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('permissions')) {
    res.status(400).json(new MyError('Please provide all required field'));
  } else {
    try {
      User.patch(req.params.id, req.body, function (err, record) {
        res.status(200).json({ result: 'Ok' });
      });
    }
    catch (err) {
      res.json(new CommonError(err));
    }
  }
}