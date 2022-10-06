const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dbConnect = require('./config/dbConnect')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

require('dotenv').config({path: 'config/.env'})

const rawMaterials = require('./routes/rawMaterials')
const production = require('./routes/production')
const warehousing = require('./routes/warehousing') 
const processing = require('./routes/processing')
const ttb = require('./routes/ttb')
const main = require('./routes/main')




// Connect to database
dbConnect();


app.get('/', (req, res) => {
    res.send('Hello World!')
})


//Routes
app.use('/api/rawMaterials', rawMaterials)
app.use('/api/production', production)
app.use('/api/warehousing', warehousing)
app.use('/api/processing', processing)
app.use('/api/ttb', ttb)
app.use('/api/', main)




app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})