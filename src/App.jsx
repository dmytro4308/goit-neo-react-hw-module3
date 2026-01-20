import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';

import styles from './App.module.css';

// Static data to show when the user visits the app for the very first time
const initialContacts = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];

const App = () => {
  /*
    We use a function inside useState so it only runs once during the first mount.
    It checks if there are contacts saved in the browser's LocalStorage.
  */
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem('saved-contacts');
    // If we find saved data, parse the string back into a JS array
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    // If LocalStorage is empty, use the default hardcoded contacts
    return initialContacts;
  });

  
  // Stores the string typed into the SearchBox component
  const [filter, setFilter] = useState('');

  /* 
    This hook runs every time the 'contacts' array changes.
    It synchronizes our state with LocalStorage so data survives page refreshes.
  */
  useEffect(() => {
    window.localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);

  // 4. 
  // Receives a new contact object from ContactForm and adds it to the list
  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      // Always use the spread operator to keep state immutable
      return [...prevContacts, newContact];
    });
  };

  
  // Filters out the contact that matches the provided ID
  const deleteContact = (contactId) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
  };

  /* 
    We calculate the visible list on every render.
    We don't need a separate state for this, as it depends on 'contacts' and 'filter'.
  */
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (

    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;