const bcrypt = require('bcryptjs')

function hashPass(password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password);
}

function comparePass(raw,hash){
    return bcrypt.compareSync(raw,hash);
}

module.exports = {
    hashPass,
    comparePass,
} 