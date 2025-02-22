
const crerate = (req, _, next) => {   
    req.body = { 
        login: req.body.login, 
        password: req.body.password,
        telegram: req.body.telegram
    }

    next()
}


const login = (req, _, next) => {   
    req.body = { 
        login: req.body.login, 
        password: req.body.password,
    }

    next()
}

const twoFA = (req, _, next) => {   
    req.body = { 
        login: req.body.login, 
        password: req.body.password,
        code: req.body.code
    }

    next()
}


module.exports = {
    crerate,
    login,
    twoFA
}
