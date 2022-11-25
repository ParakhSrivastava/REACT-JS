import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectbutton: {
    border: "1px solid skyblue",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: "skyblue",
    color: "black",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "skyblue",
      color: "black"
    },
    width: "22%"
  }
});

const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles(selected);

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
