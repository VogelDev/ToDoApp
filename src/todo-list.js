/** @jsx */

import * as React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./todo-item";

class ToDoList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="ui cards">
        {this.props.items.map(item => {
          return <ToDoItem
            description={item.taskMessage}
            key={item.taskID}
            complete={item.taskComplete}            
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
