// components/Popup.js
const Popup = ({ message, onClose }) => {
    return (
      <div className="popup">
        <span>{message}</span>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
  
  export default Popup;
  