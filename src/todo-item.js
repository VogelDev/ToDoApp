import * as React from "react";

class ToDoItem extends React.Component {
  constructor(props) {
    super();
    this.taskAction = this.taskAction.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setDueDate = this.setDueDate.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      complete: parseInt(props.complete),
      description: props.description,
      due: this.friendlyDate(props.due, "yyyy-mm-dd")
    }

  }

  taskAction(){
    if(this.props.new){
      this.newTask();
    }else{
      this.setState({
        complete: !this.state.complete
      });
    }
  }

  setDescription(evt){
    if(evt.target.value != this.state.description){
      this.setState({
        description: evt.target.value
      });
    }
  }

  newTask(){
    var task = {
      task:this.state.description,
      category:this.props.category,
      due:this.state.due
    };
    $.post('https://www.vogeldev.com/knockout/tasks/data/addTasks.php', task)
      .done((result, status, xhr) => {
        console.log('POST "Add task: Succeeded"...');
        console.log(status);
      })
      .fail((result, status, xhr) => {
        console.log('POST "Update task: Failed"');
        console.log(status);
        console.log(result);
      })
      .always(() => {
        console.log("done");
      });
  }

  setDueDate(evt){
    if(evt.target.value != this.state.due){
      this.setState({
        due: evt.target.value
      });
    }
  }

  onKeyPress(evt) {
    if (evt.key === "Enter") {
      $("input").blur();
    }
  }

  friendlyDate(date, format){
    if(!date)
      return "";
    date = new Date(date);

    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();

    if(format == 'mm/dd/yyyy'){
      date = [
        (mm > 9
          ? ""
          : "0") + mm,
          "/",
          (dd > 9
            ? ""
            : "0") + dd,
          "/",
          date.getFullYear()
      ].join("");
    }else if(format == 'yyyy-mm-dd'){
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
    }

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
    var taskActionText = "";

    var colors = ["red","orange","yellow","olive","green"];

    if(this.props.new){
      taskActionText = "Add Task";
      dateColor = "";
    }else{
      if(this.props.description == null){
        return null;
      }

      //date = this.friendlyDate(this.props.date);
      date = this.friendlyDate(this.props.date, "mm/dd/yyyy");
      dueDate = this.friendlyDate(this.state.due, "yyyy-mm-dd");
      dateDiff = this.daysTilDue(this.state.due);

      if(this.state.complete){
        dateDiff = colors.length - 1;
      }else{
        if(dateDiff < colors.length && dateDiff >= 0){
          // dateDiff is good
        }else if(dateDiff >= colors.length){
          dateDiff = colors.length - 1;
        }else if(dateDiff < 0){
          dateDiff = 0;
        }
      }

      dateColor = colors[dateDiff];
      taskActionText = "Complete";
    }

    return (
        <div className="ui centered card">
        <div className={"ui top attached top-label"}>
          <div className="ui left-label label">
            {date}
          </div>
          <input
            className={"ui "+dateColor+" right-label user-input label"}
            defaultValue={this.state.due}
            type="date"
            onChange={this.setDueDate}
            onKeyPress={evt => this.onKeyPress(evt)}/>
          </div>
          <div className="content">
            <div className="description">
              <input
              className="center user-input task-message"
              defaultValue={this.state.description}
              onBlur={evt => this.setDescription(evt)}
              onKeyPress={evt => this.onKeyPress(evt)} />
            </div>
          </div>
          <div
              className={"ui toggle checkbox bottom attached button "}
              onClick={this.taskAction}>
            <input type="checkbox" tabIndex="0" checked={this.state.complete} readOnly className="hidden" />
            <label>{taskActionText}</label>
          </div>
        </div>
      );
    }
}

export default ToDoItem;
