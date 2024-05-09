require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')
const productsRoutes = require('./routes/products')
const ofsRoutes = require('./routes/ofs')
const defautsRoutes = require('./routes/defauts')
const departementsRoutes = require('./routes/departements')



//express app
const app= express()
const cors = require('cors');
//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(cors());
//routes 3
app.use('/api/workouts', workoutsRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/ofs', ofsRoutes)
app.use('/api/defauts', defautsRoutes)
app.use('/api/departements', departementsRoutes)



//connect to db 
mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    //listen for requests
app.listen(process.env.PORT, () => {
    console.log('connect to db & listening on port', process.env.PORT)
})

})

.catch((error) => {
    console.log(error)
})




