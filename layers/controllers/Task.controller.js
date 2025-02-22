const Task = require('@models/Task.model')
const Invoice = require('@controllers/Invoice.controller')
const telegram = require('@utils/telegram.utils')
const Const = require('@core/Const')


async function handleTask(task) {
    if(task.type === 'CLOSE') {        
        const invoice = await Invoice.get(task.payload.invoice)

        if(invoice.status === Const.invoice.statusList.WAIT) {
            return await Invoice.reject(invoice._id)
        }
    }
}

async function handle(task) {
    try { await handleTask(task) }
    catch(error) { console.log('Не завершилась задача', error) }

    try { await Task.deleteOne({ _id: task._id }) }
    catch(error) { console.log('какаято хуйня с удалением задачь', error) }
}

async function load(task) {
    const timer = task.timestamp - Date.now()

    try {
        if(timer <= 500) { return await handle(task) }
        setTimeout(async () => await handle(task), timer) 
    } 
    catch(error) { console.log('load error', error) }
}

async function push(taskData) {
    const task = new Task(taskData)
    await task.save()

    load(task)
}

async function query() {
    const tasks = await Task.find()
    tasks.forEach((task) => load(task))
}


module.exports = { 
    push, 
    query
}