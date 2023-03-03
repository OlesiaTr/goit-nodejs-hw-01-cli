/* eslint-disable import/no-extraneous-dependencies */
const { program } = require('commander');

const contactControllers = require('./contacts');

program
  .option('-a, --action [type]', 'choose action')
  .option('-i, --id [type]', 'user id')
  .option('-n, --name [type]', 'user name')
  .option('-e, --email [type]', 'user email')
  .option('-p, --phone [type]', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list': {
      const contacts = await contactControllers.listContacts();
      console.table(contacts);
      break;
    }

    case 'get': {
      const contact = await contactControllers.getContactById(id);
      console.log(contact);
      break;
    }

    case 'add': {
      const newContact = await contactControllers.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;
    }

    case 'remove': {
      const deleteContact = await contactControllers.removeContact(id);
      console.log(deleteContact);
      break;
    }

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
