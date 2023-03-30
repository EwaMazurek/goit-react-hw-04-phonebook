import PropTypes from 'prop-types';
import { Component } from 'react';
import Form from './form/Form';
import { nanoid } from 'nanoid';
import ContactList from './contacts/ContactList';
import ContactsFilter from './filter/ContactsFilter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const savedState = localStorage.getItem('contacts');
    this.setState({
      contacts: savedState === null ? [] : JSON.parse(savedState),
    });
  };
  componentDidUpdate = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  deleteContact = event => {
    let deletedElem = event.target.value;
    const newArray = this.state.contacts.filter(
      contact => contact.id !== deletedElem
    );
    this.setState({ contacts: newArray });
  };

  generateContact = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const contactName = form.elements.name.value;
    const contactNumber = form.elements.number.value;
    if (this.state.contacts.some(contact => contact.name === contactName)) {
      window.alert(`${contactName} is already on the list`);
    } else {
      let newContact = {
        id: nanoid(),
        name: contactName,
        number: contactNumber,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  filterContacts = event => {
    const searchTerm = event.target.value.toLowerCase();
    this.setState({ filter: searchTerm });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <Form handleSubmit={this.generateContact}></Form>
        <h2>Contacts</h2>
        <ContactsFilter handleFilter={this.filterContacts}></ContactsFilter>
        <ContactList
          contacts={this.state.contacts}
          arrayFilter={this.state.filter}
          handleDelete={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}

App.propTypes = {
  deleteContact: PropTypes.func,
  generateContact: PropTypes.func,
  filterContacts: PropTypes.func,
};
