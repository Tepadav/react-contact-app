import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import serivalizeForm from "form-serialize";

const CreateContacts = ({ onCreateContact }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = serivalizeForm(e.target, { hash: true });
    console.log(values);

    if (onCreateContact) {
      onCreateContact({
        ...values,
      });
    }
  };

  return (
    <div>
      <Link className="close-create-contact" to="/">
        Close
      </Link>
      <form onSubmit={handleSubmit} className="create-contact-form">
        <ImageInput
          className="create-contact-avatar-input"
          name="avatarURL"
          maxHeight={64}
        />
        <div className="create-contact-details">
          <input type="text" name="name" placeholder="name" />
          <input type="text" name="handle" placeholder="handle" />
          <button>Add Contact</button>
        </div>
      </form>
    </div>
  );
};

export default CreateContacts;
