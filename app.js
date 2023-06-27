// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
// const sequelize = require('./util/database');

// const User = require('./models/User');
// var cors =require('cors');

// const app = express();

// app.use(cors());

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.post('/user/add-user',async (req,res,next) => {
    
//     const name = req.body.name;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     console.log(name, email, phone);

//     try {
//         console.log(name, email, phone);
//         const newUser = await User.create({ name, email, phone });
//         res.status(201).json({ newUserDetails: newUser });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'User creation failed' });
//       }
// }
//     )

// app.use(errorController.get404);

// sequelize
// .sync()
// .then(result =>{
//     app.listen(3000);
// })
// .catch(err =>{
// console.log(err);
// })


const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User = require('./models/User');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.post('/user/add-user', async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  console.log(name, email, phone);

  try {
    const newUser = await User.create({ name, email, phone });
    console.log(newUser);
    res.status(201).json({ newUserDetails: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });