import React from "react";

import DataByTools from "./Features/DataByTools/DataByTools";
import JsAsMainLanguage from "./Features/JsAsMainLanguage/JsAsMainLanguage";

import "./styles/app.css";

const App: React.FC = (): JSX.Element => {
    return (
        <div>
            <h2 className="text-center">State of JS data visualisation</h2>
            <div className="d-flex justify-content-evenly">
                <JsAsMainLanguage />
                <DataByTools />
            </div>
        </div>
    );
};

export default App;
