'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UrlSchema = new Schema({
    url: {
        type: String
    },
    shortUrl: {
        type: String
    },
    requests: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastAccessed: {
        type: Date
    }
});

module.exports = mongoose.model('Url', UrlSchema);