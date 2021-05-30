const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const key = require('../../../config/key').key


exports.signIn = async function (req, res) {
    if (
        !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('email')
    ) {
        res.status(400).json({ code: 'myError', description: 'Please enter email and password' });
    } else {
        try {
            const trySignInUser = await User.checkEmail(req.body);
            if (trySignInUser[0]) {
                let checkPassword = bcryptjs.compareSync(req.body.password, trySignInUser[0].password);
                if (checkPassword) {
                    let token = jwt.sign({
                        email: trySignInUser[0].email,
                        userId: trySignInUser[0].id
                    },key,{expiresIn: 3600}) ;
                    res.status(200).json({
                        access_token: `Bearer ${token}`
                        // , expires_at: '1 hour'
                    })
                } else {
                    res.status(401).json({ code: 'myError', description: 'Password is wrong' })
                }
            } else {
                res.status(404).json({ code: 'myError', description: 'User was not found' })
            }
        }
        catch (err) {
            res.json({ code: err.name, description: err.message });
        }
    }
}
exports.token = function (req, res) {
    let oldToken = req.headers.authorization.split(' ')[1];
    if (oldToken) {
        let decodedUser = jwt.verify(oldToken, key);
        let newToken = jwt.sign({
            email: decodedUser.email,
            userId: decodedUser.userId
        },key,{expiresIn: 3600}) ;
        res.status(200).json({
            access_token: `Bearer ${newToken}`
            // ,expires_at: '1 hour'
    });    
    } else {
        res.status(401).json({ code: 'myError', description: 'Token is absent'})
    }
    
}