import React, { useState } from "react";
import "../../styles/dropdown.css";

const Dropdown = ({ selected, onClick, data }) => {
    const [isActive, setIsActive] = useState(false);
    
    return (
        <div className="dropdown d-flex justify-content-end">
            <div
                className="btn btn-outline-dark"
                data-mdb-ripple-color="dark"
                onClick={(e) => {
                    setIsActive(!isActive);
                }}
            >
                {selected.toUpperCase()}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {data.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                onClick(option);
                                setIsActive(false);
                            }}
                            className="dropdown-item"
                        >
                            {option.tool === "nofrontendframework"
                                ? "No Front End FrameWork".toUpperCase()
                                : option.tool.toUpperCase()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
