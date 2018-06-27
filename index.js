const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;



mongoose.connect('mongodb://testUser:test123@ds117701.mlab.com:17701/accounty');
const db = mongoose.connection;

function toLower(v) {
    return v.toLowerCase()
}

const contactSchema = mongoose.Schema({
    firstName: { type: String, set: toLower },
    lastName: { type: String, set: toLower },
    phone: { type: String, set: toLower },
    email: { type: String, set: toLower }
});

const Contact = mongoose.model('Contact', contactSchema);

const addContact = (contacts) => {
    Contact.create(contacts, (err) => {
        assert.equal(null, err);
        console.info('New contact added');
        db.close();
    });
};


const getContact = (name) => {
    const search = new RegExp(name, 'i');
    Contact.find({ $or: [{ firstName: search }, { lastName: search }] })
        .exec((err, contact) => {
            assert.equal(null, err);
            console.info(contact);
            console.info(`${contact.length} matches found`);
            db.close();
        });
};

/**
 * @function  [getContactList]
 * @returns {Sting} status
 */
const updateContact = (_id, contact) => {
    Contact.update({ _id }, contact)
        .exec((err, status) => {
            assert.equal(null, err);
            console.info('Updated successfully');
            db.close();
        });
};

/**
 * @function  [deleteContact]
 * @returns {String} status
 */
const deleteContact = (_id) => {
    Contact.remove({ _id })
        .exec((err, status) => {
            assert.equal(null, err);
            console.info('Deleted successfully');
            db.close();
        })
}

/**
 * @function  [getContactList]
 * @returns [contactlist] contacts
 */
const getContactList = () => {
    Contact.find()
        .exec((err, contacts) => {
            assert.equal(null, err);
            console.info(contacts);
            console.info(`${contacts.length} matches`);
            db.close();
        })
}

module.exports = { addContact, getContact, getContactList, updateContact, deleteContact };

