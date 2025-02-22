const bcrypt = require('bcrypt')
const telegram = require('@utils/telegram.utils')

const User = require('@models/User.model')

const Exception = require('@core/Exception')


async function create(login, password, telegram) {
    const candidat = await User.findOne({ login })
    if(candidat) { throw Exception.isExist }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({ login, password: hashedPassword, telegram })
    
    return await save(user) 
}

async function verify(login, password) {
    const user = await User.findOne({ login })
    if(!user) { throw Exception.notAuth }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) { throw Exception.notAuth }

    return user
}

async function twoFA(id) {
    const user = await get(id)

    user.twoFA = telegram.sendCode(user.telegram)

    await save(user) 
}

async function twoFAVerify(id, code) {
    const user = await get(id)
    if(!user.twoFA) { throw Exception.notAccess }

    telegram.verify(user.twoFA, user.telegram, code)

    user.twoFA = ''
    await save(user) 
}


// ---------- DEFAULT ----------


async function save(user) {
    try { return await user.save() }
    catch(e) { throw Exception.notCanSaveModel }
}

async function get(_id) {
    const user = await User.findOne({ _id })
    if(!user) { throw Exception.notFind }

    return user
}


module.exports = { 
    create,
    verify,
    twoFA,
    twoFAVerify,

    get
}
