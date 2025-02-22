const multer = require('multer')


const storage = multer.diskStorage({
    destination(req, _file, callback) { callback(null, `static/kvits/`) },
    filename(_req, file, callback) { 
        const name = (new Date().toISOString() + '-' + file?.originalname).replace(/:/g, '-')
        callback(null, name) 
    }
})

const types = ['application/pdf', 'image/png', 'image/jpeg'] 

const fileFilter = (req, file, callback) => {
    if(types.includes(file?.mimetype)) { callback(null, true) }
    else { callback(null, false) }
}


module.exports = multer({storage, fileFilter})