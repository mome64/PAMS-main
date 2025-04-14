import React from "react";
import Button from "./Button";

const CancelButton = ({ onClick }) => (
  <Button variation="secondary" type="button" onClick={onClick}>
    Cancel
  </Button>
);

export default CancelButton;
