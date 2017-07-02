/** @jsx */

import * as React from "react";
import ReactDOM from "react-dom";
import style, {sourceMap} from "./styles.less";

const app = document.getElementById("app");

$(function() {
  $('.ui.checkbox').checkbox();
  $('.ui.dropdown').dropdown();

  const BASE_URL = "";

  if (app){
    ReactDOM.render(
      <h1>Hello World!</h1>
      , app);
    }
});
