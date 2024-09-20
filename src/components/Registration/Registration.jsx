import React, { useState } from "react";
import "./Registration.css";

function RegistrationForm({ onClose, eventId }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    heardFrom: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, eventId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Participant registered:", data);
        setIsSubmitted(true);
      })
      .catch((error) => console.error("Error registering participant:", error));
  };

  return (
    <div className="registration-container">
      <h1>Event registration</h1>
      {isSubmitted ? (
        <div className="reg-successful">
          <h2>Registration Successful!</h2>
          <button onClick={onClose}>Close</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <label>Where did you hear about this event?</label>
          <div className="form-group-answer">
            <div>
              <input
                type="radio"
                id="socialMedia"
                name="heardFrom"
                value="Social media"
                onChange={handleChange}
                required
              />
              <label htmlFor="socialMedia">Social media</label>
            </div>

            <div>
              <input
                type="radio"
                id="friends"
                name="heardFrom"
                value="Friends"
                onChange={handleChange}
              />
              <label htmlFor="friends">Friends</label>
            </div>

            <div>
              <input
                type="radio"
                id="foundMyself"
                name="heardFrom"
                value="Found myself"
                onChange={handleChange}
              />
              <label htmlFor="foundMyself">Found myself</label>
            </div>
          </div>

          <div className="handle-answer">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
