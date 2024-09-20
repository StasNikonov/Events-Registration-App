import React, { useState, useEffect } from "react";
import "./App.css";
import RegistrationForm from "../components/Registration/Registration";
import ParticipantsModal from "../components/View/View";
import Modal from "../components/Modal/Modal";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isRegistration, setIsRegistration] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);
  const handleRegisterClick = (id) => {
    setSelectedEventId(id);
    setIsRegistration(true);
  };
  const handleCloseForm = () => setIsRegistration(false);

  const handleViewParticipants = async (id) => {
    setSelectedEventId(id);
    setIsParticipantsModalOpen(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/participants/${id}`
      );
      const data = await response.json();
      setParticipants(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };
  const handleCloseParticipantsModal = () => setIsParticipantsModalOpen(false);

  return (
    <div className="container">
      <h1>Events</h1>
      <div className="event-grid">
        {currentEvents.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <div className="card-links">
              <p
                className="register"
                onClick={() => handleRegisterClick(event.id)}
              >
                Register
              </p>
              {isRegistration && (
                <Modal>
                  <RegistrationForm
                    onClose={handleCloseForm}
                    eventId={selectedEventId}
                  />
                </Modal>
              )}
              <p
                className="view"
                onClick={() => handleViewParticipants(event.id)}
              >
                View Participants
              </p>
            </div>
          </div>
        ))}
      </div>

      {isParticipantsModalOpen && (
        <Modal>
          <ParticipantsModal
            eventId={selectedEventId}
            onClose={handleCloseParticipantsModal}
          />
        </Modal>
      )}

      <div className="pagination">
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i + 1)}
            className={i + 1 === currentPage ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default App;
