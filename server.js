const express  = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const setting  = require('./config/setting');
const port = setting.PORT || process.env.PORT;
const cors = require('cors');
const path = require('path');
/* database conncetion */
mongoose
    .connect(setting.mongoURL)
    .then(() => {
        console.log(`Database connected at ${setting.mongoURL}`)
    })
    .catch(err => {
        console.log(err)
    })


/* middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));

/* cors setting */

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption))

/* test */

app.use(express.static("client/build"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get('/',(req,res)=>{
    res.json('app is running')
})

app.listen(port,()=>console.log(`app is running at ${port}`))