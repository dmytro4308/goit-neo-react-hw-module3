import styles from './SearchBox.module.css';

const SearchBox = ({ value, onFilter }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        Find contacts by name
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => onFilter(e.target.value)}
        />
      </label>
    </div>
  );
};

export default SearchBox;