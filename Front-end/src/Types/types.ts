type MainLanguageAnswerType = "Definitely no" | "No, not really" | "Yeah, why not?" | "Definitely yes";

export type DataByToolsType = Record<MainLanguageAnswerType, number>;

export type Data = Record<string, any>;
export type D3ToolTip = d3.Selection<HTMLDivElement, unknown, null, undefined>;
export type ObjectGeneric = Record<string, any>;

export type ToolType =
    | "vanillajs"
    | "es6"
    | "coffeescript"
    | "typescript"
    | "elm"
    | "clojurescript"
    | "nofrontendframework"
    | "react"
    | "angular"
    | "ember"
    | "vuejs"
    | "backbone"
    | "redux"
    | "mobx"
    | "relay"
    | "rest"
    | "firebase"
    | "graphql"
    | "apollo"
    | "falcor"
    | "horizon"
    | "meteor"
    | "feathers"
    | "donejs"
    | "mern"
    | "mean"
    | "mocha"
    | "jasmine"
    | "enzyme"
    | "jest"
    | "cucumberjs"
    | "ava"
    | "plaincss"
    | "sass"
    | "less"
    | "cssmodules"
    | "aphrodite"
    | "webpack"
    | "grunt"
    | "gulp"
    | "browserify"
    | "bower"
    | "nativeapps"
    | "reactnative"
    | "cordova"
    | "phonegap"
    | "nativescript";

export type KeysForToolType = {
    would_use: number;
    interested: number;
    would_not_use: number;
    not_interested: number;
    never_heard: number;
};

export type LoadDataByToolTypeMap = Record<ToolType, KeysForToolType>;

export type DataByToolTypeMap = {
    tool: ToolType;
    would_use: number;
    interested: number;
    would_not_use: number;
    not_interested: number;
    never_heard: number;
};
