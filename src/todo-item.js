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

  daysPassed(date){
    // subtract days, divide by:
    // 24 hours in a day
    // 60 minutes in an hour
    // 60 seconds in a minute
    // 1000 milliseconds in a second
    return Math.floor(((new Date()) - new Date(date)) / (24*60*60*1000));
  }

  render() {

    var date = this.friendlyDate(this.props.date);
    var dateDiff = this.daysPassed(this.props.date);

    var colors = ["green", "olive", "yellow", "orange", "red"];

    if(this.state.complete){
      dateDiff = 0;
    }else{
      dateDiff = dateDiff / 10 * (colors.length - 1) > colors.length - 1 ? 4: Math.floor(dateDiff / 10 * 4)
    }

    var dateColor = colors[dateDiff];
    return (
        <div className="card">
        <div className={"ui top right attached "+dateColor+" label"}>
          {date}
        </div>
          <div className="content">
            <div className="description">
              <h3 className="center">{this.props.description}</h3>
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
