/** @jsx */

import * as React from "react";
import ReactDOM from "react-dom";
import style, {sourceMap} from "./styles.less";
import ToDoList from "./todo-list";
import ToDoItem from "./todo-item";

const app = document.getElementById("app");

var BASE_URL = "";

if (process.env.NODE_ENV === 'development')
  BASE_URL = "https://private-77b6e-todolist64.apiary-mock.com/tasks/1/";

$(function() {
  $('.ui.checkbox').checkbox();

  $.getJSON(BASE_URL)
  .done(function(data) {
    if (app){
      ReactDOM.render(<ToDoList items={data} />, app);
    }
  })
  .fail(function(result, status, xhr) {
      console.error(result, status, xhr);
    }
  );

});
