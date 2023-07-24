import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Signout = () => {
  const history = useHistory();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch("https://bike-rental-portal-k5bj.onrender.com/signout", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.status !== 200) {
          const error = new Error("Failed to logout.");
          throw error;
        }

        localStorage.removeItem("User");
        setShowSuccessModal(true);
      } catch (error) {
        console.log(error);
      }
    };

    logoutUser();
  }, []);

  const handleModalClose = () => {
    setShowSuccessModal(false);
    history.push("/");
  };

  return (
    <>
      <h1>Log Out</h1>
      {/* Modal to show success message */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Successfully logged out!</p>
            <button onClick={handleModalClose}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Signout;
