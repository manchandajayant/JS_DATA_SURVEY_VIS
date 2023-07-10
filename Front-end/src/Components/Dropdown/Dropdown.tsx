import React, { useState, useCallback } from "react";
import "../../styles/dropdown.css";
import { DataByToolTypeMap } from "../../Types/types";

type PropsDropDown = {
  selected: string;
  onClick: (option: DataByToolTypeMap) => void;
  data: DataByToolTypeMap[];
};

const Dropdown: React.FC<PropsDropDown> = ({ selected, onClick, data }) => {
  const [isActive, setIsActive] = useState(false);

  const handleDropdownClick = useCallback(() => {
    setIsActive((prevIsActive) => !prevIsActive);
  }, []);

  const handleOptionClick = useCallback(
    (option: DataByToolTypeMap) => {
      onClick(option);
      setIsActive(false);
    },
    [onClick]
  );

  return (
    <div className="dropdown d-flex justify-content-end">
      <div className="btn btn-outline-dark" data-mdb-ripple-color="dark" onClick={handleDropdownClick}>
        {selected.toUpperCase()}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {data.map((option: DataByToolTypeMap, index: number) => (
            <div key={index} onClick={() => handleOptionClick(option)} className="dropdown-item">
              {option.tool === "nofrontendframework" ? "No Front End Framework".toUpperCase() : option.tool.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
