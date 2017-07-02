import React from "react";

class ToDoItem extends React.Component {
  constructor() {
    super();
    this.isResponded = this.isResponded.bind(this);
    this.showActions = this.showActions.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.acknowledge = this.acknowledge.bind(this);
    this.showStudentName = this.showStudentName.bind(this);
    this.state = {
      showCard: true,
      responded: false
    };
  }

  dismiss() {
    console.log('dismiss...')
    this.setState({showCard: false});
  }

  acknowledge() {
    this.setState({responded: true});
  }

  isResponded() {
    if (this.state.responded) {
      return (
        <div className="extra content">
          <i className="green checkmark circle icon"/>
          — Acknowledged
        </div>
      );
    }
    return null;
  }

  showActions() {
    let acknowledged = null;
    let dismiss = null;

    if (!this.isResponded()) {
      acknowledged = <div className="ui basic green button" onClick={this.acknowledge}>Acknowledge</div>
    } else {
      dismiss = <div className="ui basic red button" onClick={this.dismiss}>Dismiss</div>
    }

    if (this.props.isStudent) {
      return (
        <div className="ui bottom attached one buttons">
          {acknowledged}
          {dismiss}
        </div>
      );
    }
    return null;
  }

  showStudentName() {
    if (!this.props.isStudent) {
      return (
        <div>
          <img alt="avatar" className="right floated mini ui image" src={`images/profile_${this.props.studentID}.jpg`}/>
          <div className="header">
            {`${this.props.studentFirstName} ${this.props.studentLastName}`}<br/>
            Student ID: {this.props.studentID}
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    let date = new Date(this.props.sent);

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

    var icon = null;
    if(this.props.isStudent){
      icon = "calendar";
    }else{
      icon = "student";
    }

    if (this.state.showCard === false) {
      return null;
    } else {
      return (
        <div className="card">
          <div className="ui top attached label">
            <i className={icon + " icon"}></i>
            <span className="date">{date}</span>
          </div>
          <div className="content">
            {this.showStudentName()}
            <div className="description">
              {this.props.message}
            </div>
          </div>
          {this.isResponded()}
          {this.showActions()}
        </div>
      );
    }

  }
}

export default TodoItem;
