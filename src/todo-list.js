/** @jsx */

import * as React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./todo-item";

class ToDoList extends React.Component {
  constructor() {
    super();
  }

  render() {

    this.props.items.sort(function(a,b){
      return (a.taskComplete === b.taskComplete) ? 0 : b ? 1 : -1;
    }).reverse();

    return (
      <div className="ui cards">
        {this.props.items.map(item => {
          return <ToDoItem
            description={item.taskMessage}
            key={item.taskID}
            complete={item.taskComplete}
            date={item.taskDate}
          />;
        })}
      </div>
    );
  }
}

ToDoList.propTypes = {
  items: PropTypes.array.isRequired
};

export default ToDoList;
