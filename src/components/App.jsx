import Form from './form/Form';
import { nanoid } from 'nanoid';
import ContactList from './contacts/ContactList';
import ContactsFilter from './filter/ContactsFilter';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    if (localStorage.getItem('contacts') !== null)
      return JSON.parse(localStorage.getItem('contacts'));
    else return [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = event => {
    let deletedElem = event.target.value;
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== deletedElem);
    });
  };

  const addContact = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const contactName = form.elements.name.value;
    const contactNumber = form.elements.number.value;
    if (contacts.some(contact => contact.name === contactName)) {
      window.alert(`${contactName} is already on the list`);
    } else {
      let newContact = {
        id: nanoid(),
        name: contactName,
        number: contactNumber,
      };
      setContacts([...contacts, newContact]);
    }
  };

  const filterContacts = event => {
    const searchTerm = event.target.value.toLowerCase();
    setFilter(searchTerm);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form handleSubmit={addContact}></Form>
      <h2>Contacts</h2>
      <ContactsFilter handleFilter={filterContacts}></ContactsFilter>
      <ContactList
        contacts={contacts}
        arrayFilter={filter}
        handleDelete={deleteContact}
      ></ContactList>
    </div>
  );
};
