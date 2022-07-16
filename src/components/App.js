import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../css/App.css";
import ListContacts from "./ListContacts";
import * as ContactApi from "../utils/ContactsAPI";
import CreateContact from "./CreateContact";

const App = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  const removeContact = (id) => {
    ContactApi.remove(id);

    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const createContact = (contact) => {
    const create = async () => {
      const res = await ContactApi.create({
        name: contact.name,
        handle: contact.handle,
      });
      setContacts(contacts.concat(res));
    };

    create();
    navigate("/");
  };

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactApi.getAll();

      setContacts(res);
    };

    getContacts();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ListContacts contacts={contacts} onDeleteContact={removeContact} />
          }
        />
        <Route
          path="/create"
          element={
            <CreateContact
              onCreateContact={(contact) => createContact(contact)}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
