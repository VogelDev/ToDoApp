import * as React from "react";

class ToDoItem extends React.Component {
  constructor(props) {
    super();
    this.taskAction = this.taskAction.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.state = {
      complete: props.complete,
      description: props.description
    }

  }

  taskAction(){
    if(this.props.new){

    }else{
      this.setState({
        complete: !this.state.complete
      });
    }
  }

  setDescription(d){
    this.setState({
      description: d
    });
  }

  friendlyDate(date){
    if(!date)
      return "";
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

    var date = "";
    var dueDate = "";
    var dateDiff = "";
    var dateColor = "";
    var taskAction = "";

    var colors = ["red","orange","yellow","olive","green"];


    if(this.props.new){
      taskAction = "Add Task";
      dateColor = "";
    }else{

      date = this.friendlyDate(this.props.date);
      dueDate = this.friendlyDate(this.props.due);
      dateDiff = this.daysTilDue(this.props.due);

      if(this.state.complete){
        dateDiff = colors.length - 1;
      }else{
        dateDiff = 5 - dateDiff >= 0 ? dateDiff : 0;
      }

      dateColor = colors[dateDiff];
      taskAction = "Complete";
    }

    return (
        <div className="ui centered card">
        <div className={"ui top attached top-label"}>
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
          <div className={"ui toggle checkbox bottom attached button "} onClick={this.taskAction}>
            <input type="checkbox" tabIndex="0"  checked={this.state.complete} readOnly className="hidden" />
            <label>{taskAction}</label>
          </div>
        </div>
      );
    }
}

export default ToDoItem;
