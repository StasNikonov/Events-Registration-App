import React, { useEffect, useState } from "react";
import "./view.css";

const ParticipantsModal = ({ eventId, onClose }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/participants/${eventId}`
        );
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [eventId]);

  return (
    <div className="modal">
      <h2>Participants for Event {eventId}</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            <span>{participant.name}</span>
            <span className="email">{participant.email}</span>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ParticipantsModal;
