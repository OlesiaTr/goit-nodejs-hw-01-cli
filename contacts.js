/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs/promises');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => +contact.id === contactId);
  if (!result) return null;
  return result;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.find(contact => +contact.id === contactId);
  if (idx === -1) return null;
  const updatedList = contacts.filter((_, i) => i !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(updatedList));
  return contacts[idx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
