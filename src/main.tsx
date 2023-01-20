import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {IntlProvider} from "react-intl";
import kr from './lang/kr.json'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<IntlProvider locale={'kr'} messages={kr}><App/></IntlProvider>);
