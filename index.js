const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const authRoute = require('./routes/auth');
const authAdminRoute = require('./routes/authAdmin');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const postadminRoute = require('./routes/postsadmins');
const categoryRoute = require('./routes/categories');
const newsletterRoute = require('./routes/newsletters');
const multer = require('multer');
const path = require('path');
const cors = require('cors')


dotenv.config();
app.use(express.json());

// app.use(
//     cors({
//         origin :"https://hyphentech-blog.vercel.app"          
//     })
// )


app.use("/images", express.static(path.join(__dirname, "/images")));


//connection to db

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    // useCreateIndex:false,
    // useFindAndModify:false,
}) 
.then(
    app.listen(process.env.PORT || 5000, ()=>{
    console.log('Backend is on and the port listening');
}))
    
.catch(err=>
    (console.log(err.message)))

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "images");
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        }
      });

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),  (req, res)=>{
    res.status(200).json("file has been uploaded")
})
app.get("/images/:filename", (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, "images", filename));
  });



//routes

app.use('/api/auth', authRoute);
app.use('/api/authAdmin', authAdminRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/postsadmins', postadminRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/newsletters', newsletterRoute);