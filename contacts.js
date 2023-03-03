/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs/promises');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return console.error('Error:', error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    if (!result) return null;
    return result;
  } catch (error) {
    return console.error('Error:', error.message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const idx = contacts.find(contact => contact.id === contactId);
    if (idx === -1) return null;
    const [result] = contacts.splice(idx.id, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    return console.error('Error:', error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: uuidv4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    return console.error('Error:', error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
