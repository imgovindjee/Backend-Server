const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const connectDB = require("./config/DB_Connection");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const PORT = process.env.PORT || 3600;


app.use(express.json()); // middleware the parse the data to the server side to client side

app.use("/contacts", require('./routes/getContacts'))
app.use("/contacts", require('./routes/getContact'))
app.use("/contacts", require('./routes/postContacts(create)'))
app.use("/contacts", require('./routes/delContacts'))
app.use("/contacts", require('./routes/putContacts'))
app.use("/user", require('./routes/userRoutes'))


app.use(errorHandler); // middle inUse to handle the Errors


app.listen(PORT, ()=>{
    console.log(`Listing at the http://localhost:${PORT}`);
})