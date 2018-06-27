const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;



mongoose.connect('mongodb://testUser:test123@ds117701.mlab.com:17701/accounty');
const db = mongoose.connection;

function toLower(v){
    return v.toLowerCase()
}

const contactSchema = mongoose.Schema({
    firstName: {type: String, set: toLower},
    lastName: {type: String, set: toLower},
    phone: {type: String, set: toLower},
    email: {type: String, set: toLower}
});

const Contact = mongoose.model('Contact',contactSchema);

const addContact = (contacts) => {
    Contact.create(contacts, (err) => {
        assert.equal(null,err);
        console.info('New contact added');
        db.close();
    });
};


const getContact = (name) => {
    const search = new RegExp(name,'i');
    Contact.find({$or:[{firstName:search}, {lastName:search}]})
    .exec((err, contact) => {
        assert.equal(null,err);
        console.info(contact);
        console.info(`${contact.length} matches found`);
        db.close();
    });
};

module.exports = {addContact, getContact};

