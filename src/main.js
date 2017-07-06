/** @jsx */

import * as React from "react";
import ReactDOM from "react-dom";
import style, {sourceMap} from "./styles.less";
import ToDoCategories from "./todo-categories";

const app = document.getElementById("app");

var BASE_URL = "";

if (process.env.NODE_ENV === 'development'){
  BASE_URL = "https://private-77b6e-todolist64.apiary-mock.com/tasks/1/";
  BASE_URL = "https://www.vogeldev.com/knockout/tasks/data/getTasks.php";
}

$(function() {
  $('.ui.checkbox').checkbox();

  $.getJSON(BASE_URL)
  .done(function(data) {
    if (app){
      console.log(data);
      ReactDOM.render(<ToDoCategories items={data} />, app);
    }
  })
  .fail(function(result, status, xhr) {
      console.error(result, status, xhr);
    }
  );

  // $.getJSON("https://www.vogeldev.com/knockout/tasks/data/getTasks.php", function(data) {
  //   console.log(data);
  // });


});
