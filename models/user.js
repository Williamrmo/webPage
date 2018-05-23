'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const passwordValidation = {
    validator: function (p) {
        return this.password_confimation === this.p
    },
    message: "Las contraseñas no son igules"
}

const UserSchema = new Schema({
    displayName: String,
    username: { type: String, unique: true, maxlength:[8, 'Username muy grande max 8']},
    email: { type: String, unique: true, required: "El coreo es obligatorio" },
    password: { type: String, select:false, minlength: [6, "Password muy corto min 6"], validate: passwordValidation},
    signupDate: { type: Date, default: Date.now()},
    lastLogin: Date
})

UserSchema.virtual("password_confimation").get(function () {
    return this.p_c
}).set(function (password) {
    this.p_c = password
});

UserSchema.pre('save', (next) => {
    let user = this
    // if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err,salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', UserSchema)