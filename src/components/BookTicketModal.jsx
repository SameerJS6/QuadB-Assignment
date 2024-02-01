/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";

const BookTicketModal = forwardRef(
  ({ movieName, setIsMenuOpen, isMenuOpen, setIsSnackbarOpen }, ref) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      selectedTime: "",
    });
    const handleSnackbar = () => {
      setIsSnackbarOpen(true);
      setTimeout(() => setIsSnackbarOpen(false), 3000);
    };
    const handleChange = (e) => {
      const { value, name } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const bookingData = {
        ...formData,
        selectedMovie: movieName,
      };

      if (
        formData.name &&
        formData.email &&
        formData.selectedTime &&
        movieName
      ) {
        localStorage.setItem("bookingDetails", JSON.stringify(bookingData));
        handleSnackbar();
        setFormData({
          name: "",
          email: "",
          selectedTime: "",
        });
        ref.current.close();
      }
    };
    return (
      <dialog ref={ref} className="modal">
        <div className="title-wrapper">
          <h2 className="modal-title">Book Ticket</h2>
          <button className="close-btn" onClick={() => ref.current.close()}>
            <span className="material-symbols-rounded icon-sm text-muted">
              close
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div className="input-field-wrapper">
              <label htmlFor="name" className="text-xs">
                Name
              </label>
              <input
                type="text"
                autoFocus
                required
                placeholder="Joe Doe"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-field-wrapper">
              <label htmlFor="email" className="text-xs">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="joe@gmail.com"
                id="email"
                name="email"
              />
            </div>
          </div>

          <div className="input-field-wrapper my-4">
            <label htmlFor="movie" className="text-xs text-muted">
              Movie
            </label>
            <input
              className="movie-input"
              value={movieName}
              type="text"
              disabled
              id="movie"
            />
          </div>

          <div className="select-wrapper">
            <label className="text-xs input-field-wrapper">
              Select Time:
              <select
                name="selectedTime"
                className="select-time text-sm"
                onFocus={() => setIsMenuOpen(true)}
                onChange={(e) => {
                  handleChange(e);
                  setIsMenuOpen(false);
                }}
                value={formData.selectedTime}
                required
              >
                <option className="time-option" value="">
                  Select a Time
                </option>
                <option className="text-muted" value="morning">
                  Morning
                </option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </label>
            <span
              style={{ rotate: isMenuOpen ? "180deg" : "0deg" }}
              className="expand-more material-symbols-rounded icon-sm"
            >
              expand_more
            </span>
          </div>

          <div className="dialog-actions">
            <button
              onClick={() => ref.current.close()}
              className="dialog-actions-btns text-sm text-muted cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="dialog-actions-btns confirm-btn text-sm"
            >
              Confirm
              <span className="material-symbols-rounded icon-xs">
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

export default BookTicketModal;
