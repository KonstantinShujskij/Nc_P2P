
const auth = require('@utils/auth.utils')
const Exception = require('@core/Exception')
const Parnter = require('@models/Partner.model')


async function create(name) {
    const partner = new Parnter({ name })

    const { privateToken, accessToken, hashedToken } = auth.createPartner(partner._id)

    partner.accessToken = accessToken
    partner.privateToken = hashedToken

    await partner.save()

    return { accessToken, privateToken }
}

async function get(id) {
    const partner = await Parnter.findOne({ _id: id })
    if(!partner) { throw Exception.notFind }

    return partner
}


module.exports = { 
    create, 
    get,
}