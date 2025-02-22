
const auth = require('@utils/auth.utils')
const Exception = require('@core/Exception')
const Admin = require('@models/Admin.model')


async function create(name) {
    const admin = new Admin({ name })

    const { privateToken, accessToken, hashedToken } = auth.createAdmin(admin._id)

    admin.accessToken = accessToken
    admin.privateToken = hashedToken

    await admin.save()

    return { accessToken, privateToken }
}

async function get(id) {
    const admin = await Admin.findOne({ _id: id })
    if(!admin) { throw Exception.notFind }

    return admin
}


module.exports = { 
    create, 
    get,
}