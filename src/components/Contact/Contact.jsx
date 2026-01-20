import { IoMdPerson } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import styles from './Contact.module.css';

const Contact = ({ name, number, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.infoList}>
        
        {/* Name Row */}
        <div className={styles.infoItem}>
          <IoMdPerson className={styles.icon} />
          <p className={styles.infoText}>{name}</p>
        </div>

        {/* Number Row */}
        <div className={styles.infoItem}>
          <FaPhoneAlt className={styles.icon} />
          <p className={styles.infoText}>{number}</p>
        </div>
        
      </div>

      <button className={styles.deleteBtn} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;