const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {

    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await db.words.findAll();
}

async function getById(id) {
    return await getwords(id);
}

async function create(params) {

    // save user
    await db.words.create(params);
}

async function update(id, params) {
    const user = await getwords(id);

    // validate
    const usernameChanged = params.email && user.email !== params.email;
    if (usernameChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getwords(id);
    await user.destroy();
}

// helper functions

async function getwords(id) {
    const words = await db.words.findByPk(id);
    if (!words) throw 'words not found';
    return words;
}

