const Log = require('@models/Log.model')

const Exception = require('@core/Exception')


async function create(data={}) {
    const log = new Log(data)    
    
    return await save(log) 
}


async function save(log) {
    try { return await log.save() }
    catch(e) { throw Exception.notCanSaveModel }
}

async function get(_id) {
    const log = await Log.findOne({ _id })
    if(!log) { throw Exception.notFind }

    return log
}


module.exports = { 
    create,

    get
}
