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
      <section className="ui segment basic">
      <div className="ui top attached">
        <div className="ui right label">
        {this.props.name}
        </div>
      </div>
      <div className="ui segment secondary basic todo-list">
      <div className="ui cards">
        {this.props.items.map(item => {
          return <ToDoItem
            description={item.TASK}
            key={Math.random()}
            complete={item.COMPLETED}
            date={item.CREATED}
            due={item.DUE}
          />;
        })}
      </div>
      </div>
      </section>
    );
  }
}

ToDoList.propTypes = {
  items: PropTypes.array.isRequired
};

export default ToDoList;
