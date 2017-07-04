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

  friendlyDate(date){
    date = new Date(date);

    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();

    date = [
      date.getFullYear(),
      "-",
      (mm > 9
        ? ""
        : "0") + mm,
      "-",
      (dd > 9
        ? ""
        : "0") + dd
    ].join("");

    return date;
  }

  daysTilDue(date){
    // subtract days, divide by:
    // 24 hours in a day
    // 60 minutes in an hour
    // 60 seconds in a minute
    // 1000 milliseconds in a second
    return Math.floor(((new Date(date)) - new Date()) / (24*60*60*1000));
  }

  render() {

    var date = this.friendlyDate(this.props.date);
    var dueDate = this.friendlyDate(this.props.due);
    var dateDiff = this.daysTilDue(this.props.due);

    var colors = ["red","orange","yellow","olive","green"];

    if(this.state.complete){
      dateDiff = colors.length - 1;
    }else{
      dateDiff = 5 - dateDiff >= 0 ? dateDiff : 0;
    }

    var dateColor = colors[dateDiff];
    return (
        <div className="card">
        <div className={"ui top attached"}>
          <div className="ui left-label label">
            {date}
          </div>
          <div className={"ui "+dateColor+" right-label label"}>
            {dueDate}
          </div>
        </div>
          <div className="content">
            <div className="description">
              <div className="center task-message">{this.props.description}</div>
            </div>
          </div>
          <div className={"ui toggle checkbox bottom attached button "} onClick={this.toggleComplete}>
            <input type="checkbox" tabIndex="0"  checked={this.state.complete} readOnly className="hidden" />
            <label>Complete</label>
          </div>
        </div>
      );
    }
}

export default ToDoItem;
