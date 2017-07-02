/** @jsx */

import * as React from "react";
import ReactDOM from "react-dom";
import style, {sourceMap} from "./styles.less";
import ToDoItem from "./todo-list";

const app = document.getElementById("app");

$(function() {
  $('.ui.checkbox').checkbox();
  $('.ui.dropdown').dropdown();

  const BASE_URL = "";

  $.getJSON(BASE_URL, function(data)){
    if (app){
      ReactDOM.render(
        <ToDoList items={data}/>
        , app);
      }
  }
});
