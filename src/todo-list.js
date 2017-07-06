/** @jsx */

import * as React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./todo-item";

class ToDoList extends React.Component {
  constructor(props) {
    super();
    this.updateInputValue = this.updateInputValue.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      name: props.name
    }
  }

  updateInputValue(evt, state) {

    if (evt.target.value != this.state[state]) {
      // different, handle it

      if (this.props.new) {
        //ajax call to create a category
      } else {
        // this.state[state] = evt.target.value;
        var stateObject = function() {
          var returnObj = {};
          returnObj[state] = evt.target.value;
          return returnObj;
        };

        this.setState(stateObject);
      }
    } else {
      // same, do nothing
    }
  }

  onKeyPress(evt) {
    if (evt.key === "Enter") {
      $("input").blur();
    }
  }

  render() {

    // this.props.items.sort(function(a,b){
    //   return (a.taskComplete === b.taskComplete) ? 0 : b ? 1 : -1;
    // }).reverse();

    var newTask = "";

    if (!this.props.new) {
      newTask = <ToDoItem description="New task" new="true" category={this.props.id}/>;
    }

    return (
      <section className="ui segment basic">
        <div className="ui top attached">
          <input
            className="ui header category user-input"
            type="text"
            defaultValue={this.props.name}
            onBlur={evt => this.updateInputValue(evt, "name")}
            onKeyPress={evt => this.onKeyPress(evt)}/>
        </div>
        <div className="ui segment secondary basic todo-list">
          <div className="ui three stackable cards">
            {this.props.items.map(item => {
              return <ToDoItem
                        description={item.TASK}
                        id={item.ID}
                        key={Math.random()}
                        complete={item.COMPLETED}
                        date={item.CREATED}
                        due={item.DUE}
                        category={this.props.id}/>;
            })}
            {newTask}
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
