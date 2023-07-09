import React, { useState } from "react";
import "../../styles/dropdown.css";
import { DataByToolTypeMap } from "../../Types/types";

export type PropsDropDown = {
    selected: string;
    onClick: (option: DataByToolTypeMap) => void;
    data: DataByToolTypeMap[];
};

const Dropdown = ({ selected, onClick, data }: PropsDropDown) => {
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
                    {data.map((option: DataByToolTypeMap, index: number) => (
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
                                : (option.tool.toUpperCase() as string)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
