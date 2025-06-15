require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

 const port = process.env.PORT;
 const url = process.env.MONGO_URL;

 
mongoose.connect(url).then(
    (res)=>{
        console.log('dataBase is connect');
       
app.listen(port,()=>{
    console.log(`the serve is running on port ${port} !`);
    
});
        
    }
)
.catch((error)=>{console.log(error.message)}
);
