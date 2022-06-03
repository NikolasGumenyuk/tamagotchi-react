const ProgressBar = ({ completed, label, icon }) => {
  const setColor = () => {
    if (completed > 70) {
      return "green";
    }
    if (completed < 38) {
      return "red";
    }
    return "orange";
  };

  const allShit = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: "20px",
    backgroundColor: "#e0e0de",

  };

  const containerStyles = {
    height: 20,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 10,
    flex: 1,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: setColor(),
    borderRadius: "inherit",
    textAlign: "right",
    transition: "background-color 0.5s ease-out, width 1s ease-in-out",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  const nameStyles = {
    display: "flex",
    justifyContent: "center",
  };

  const iconStyles = {
    margin: "10px",
  }

  const characteristicStyles = {
    display: "flex",
    flexDirection: "row",
  }

  return (
    <div style={allShit}>
      <span style={nameStyles}>{label}</span>
      <div style={characteristicStyles}>
      <span style={iconStyles}>{icon}</span>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProgressBar;
