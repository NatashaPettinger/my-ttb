const User = require('../db/User');

// @POST api/register/
// @desc register new user
// @access public

const register = async(req, res) => {
    try {
        const {name, email, password} = req.body

        
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    register
}