import * as React from "react";

class ToDoItem extends React.Component {
  constructor(props) {
    super();
    this.toggleComplete = this.toggleComplete.bind(this);
    this.state = {
      complete: props.complete
    }

  }

  toggleComplete(){
    this.setState({
      complete: !this.state.complete
    });
  }

  render() {
    return (
        <div className="card">
          <div className="content">
            <div className="description">
              {this.props.description}
            </div>
            <div className="inline field">
             <div className={"ui toggle checkbox"} onClick={this.toggleComplete}>
               <input type="checkbox" tabIndex="0"  checked={this.state.complete} readOnly className="hidden" />
               <label>Complete</label>
             </div>
           </div>
          </div>
        </div>
      );
    }
}

export default ToDoItem;
