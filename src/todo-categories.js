/** @jsx */

import * as React from "react";
import PropTypes from "prop-types";
import ToDoList from "./todo-list";

class ToDoCategories extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <section>
        {this.props.items.map(item => {
          return <ToDoList
            name={item.name}
            id={item.category}
            key={Math.random()}
            items={item.tasks}/>
        })}
        <ToDoList
          name="Add Category"
          items={[]}
          new="true"/>
      </section>
    )
  }
}

ToDoList.propTypes = {
  items: PropTypes.array.isRequired
};

export default ToDoCategories;
