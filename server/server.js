const express = require('express');
const app = express();
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const tasksRoute = require('./routes/tasks');
const mongoose = require('mongoose');

const db = "mongodb+srv://Deniss:narvahaigla@firstcluster.k4micc7.mongodb.net/eksamlab?retryWrites=true&w=majority"

mongoose.connect(db)
  .then(() => console.log('Database connected'));

app.use(express.json());

app.use('/api', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/tasks', tasksRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));