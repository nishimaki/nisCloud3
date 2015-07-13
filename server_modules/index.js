// Global
__ = require('underscore');
ncmb = require('./ncmb');
// util = require('./util');
// PDFDocument = require('pdfkit'); 
mongoose = require('mongoose');
mongodb = mongoose.connect('mongodb://localhost/niscloud');

// exports
module.exports = {
    user: require('./user'),
    chat: require('./chat'),
    portal: require('./portal'),
    mntcustmer: require('./mntCustmer'),
    mntitem: require('./mntItem'),
};