const router = require('express').Router()
const bcrpyt = require('bcrypt')
const pool = require('../db')
const jwtGenerator = require('../utils/jwtGenerator')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

// Register 
router.post('/register', validInfo, async (req, res) => {
    try {
        // Destructuring req.body 
        const {user_name, user_email, user_password} = req.body;        
        
        // Checking if user exists 
        const user = await pool.query('SELECT * from users WHERE user_email = $1', [user_email])
        
        if(user.rows.length !== 0) {
            return res.status(401).send("user already exists");
        }
        
        // Bcrypt password 
        const saltRound = 10;
        const salt = await bcrpyt.genSalt(saltRound)

        const bcrpytPassword = await bcrpyt.hash(user_password, salt)
        
        // Enter new user inside database
        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [user_name, user_email, bcrpytPassword])

        // generate jwt token 
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token })
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

// Login
router.post('/login', validInfo, async (req, res) => {
    try {
        // destructure req.body 
        const { user_email, user_password } = req.body;

        // check if user doesnt exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]) 
        if (user.rows.length === 0) {
            return res.status(401).send("email or password is incorrect")
        }
        
        // check if incoming password true
        const validPassword = await bcrpyt.compare(user_password, user.rows[0].user_password)

        // login success by giving jwt token
        if(!validPassword) {
            return res.status(401).send("email or password is incorrect")
        }
        
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token })
        
    } catch(err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

router.get('/verify', authorization, async (req, res) => {
    try {
        res.json(true)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router