const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes.js')
const adminRoutes = require('./routes/admin.routes.js')
const managerRoutes = require('./routes/manager.routes.js')
const authRoutes = require('./routes/auth.routes.js')
const salesRoutes = require('./routes/slaes.routes.js')
const cors = require('cors')

app.use(cors({
      origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/test',(req, res)=>{
    res.send("testing done")
})

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes)
app.use('/api/manager',managerRoutes);
app.use('/api/sales',salesRoutes);


module.exports = app