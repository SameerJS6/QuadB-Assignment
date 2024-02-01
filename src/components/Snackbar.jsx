/* eslint-disable react/prop-types */
import "../styles/snackbar.css";

export default function Snackbar({ setIsOpen }) {
  return (
    <div className="snackbar">
      <div>
        <span className="material-symbols-rounded icon-md line-height-none filled">
          check_circle
        </span>
      </div>

      <div className="snackbar-content">
        <div>
          <p className="text-sm" style={{ fontWeight: 500 }}>
            Ticket Booked Successfully!!
          </p>
          <p className="text-xs">Your movie ticket has been booked.</p>
        </div>

        <button onClick={() => setIsOpen(false)} className="close-btn">
          <span className="material-symbols-rounded icon-sm">close</span>
        </button>
      </div>
    </div>
  );
}
