const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// Routes

// Register and login routes 
app.use('/auth', require('./routes/jwtAuth'))
app.use('/dashboard', require('./routes/dashboard'))

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})