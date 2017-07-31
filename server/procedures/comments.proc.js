var db = require('../config/db');

//Pass in animal id
exports.all = function() {
    return db.rows('GetAllComments');
}

exports.read = function(id) {
    return db.rows('GetComments', [id]);
}

exports.update = function(comment, id) {
    return db.empty('UpdateComment', [comment, id]);
}

exports.destroy = function(id) {
    return db.empty('DeleteComment', [id]);
}

exports.create = function(animalid, userid, comment) {
    return db.row('InsertComment', [animalid, userid, comment]);
}