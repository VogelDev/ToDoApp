/** @jsx */

import * as React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./todo-item";

class TodoList extends React.Component {

  componentDidMount() {
    log(this.props.items);
  }

  render() {
    return (
      <div className="ui cards">
        {this.props.items.map((item) => {
          return <ToDoItem todo=item/>
        })}
      </div>
    );
  }
}

TodoList.propTypes = {
  items: PropTypes.array.isRequired
};

export default TodoList;
