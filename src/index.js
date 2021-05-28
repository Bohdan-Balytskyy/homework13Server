const express = require('express');
const mysql = require('mysql2');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./config/app');
const key = require('./config/key').key;
const app = express();

const mysqlConnection = mysql.createConnection(config);
module.exports = mysqlConnection;
mysqlConnection.connect(err => {
    if (err) console.log(err);
    console.log(`Connected`);
});

const User = require('./app/components/models/user');

app.use((req, res, next) => {         ///додано 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
  next();
});

app.use(passport.initialize());
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key
}
passport.use(
  new JwtStrategy(options, async (payload,done) => {
    try {
      let user = await User.checkEmail(payload)
      if (user[0]) {
        done(null, user[0])
      } else {
        done(null,false)
      }  
    }
    catch (err) {
      console.log(err);
    }
  })
)

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World");
});

// mysqlConnection.end(err => {
//   if (err)  console.log(err);
//   else console.log("Підключення закрито");
// });

const authRoutes = require('./app/routes/auth.route');
app.use('/auth/v1/', authRoutes);

const userRoutes = require('./app/routes/user.route');
app.use('/api/v1/users', userRoutes); 

app.listen('5000',() => {
    console.log(`Server is listening on port 5000`);
});
