const app = require('./app.js')
const dotenv = require('dotenv');
const connectDB = require('./config/db.js')
dotenv.config(); 
connectDB();


app.listen(process.env.PORT, ()=>{
    console.log("the server is running on port: ",process.env.PORT)
});