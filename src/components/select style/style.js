export const customStyles = {
  container: (base) => ({
    ...base,
    width: "300px",
    cursor:'pointer',
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "var(--color-bg-secondary)",
    borderColor: state.isFocused ? "#3ea6ff" : "#333",
    boxShadow: "none",
    minHeight: "32px",
    height: "32px",
    borderRadius: "8px",
    fontSize: "14px",
    padding: "0 4px",
    "&:hover": {
      borderColor: "#3ea6ff",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 6px",
    height: "32px",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "32px",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color: state.isFocused ? "#3ea6ff" : "var(--text-color-primary)",
    "&:hover": {
      color: "#3ea6ff",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--color-bg-secondary)",
    border: "1px solid #333",
    borderRadius: "8px",
    marginTop: "4px",
    fontSize: "14px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "var(--color-bg-main)" : "var(--color-bg-secondary)",
    color: "var(--text-color-primary)",
    padding: "6px 10px",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--text-color-primary)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};