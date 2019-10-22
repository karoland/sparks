import React from "react";
import NotificationItem from "./NotificationItem";
import {notifications} from "./data";
import CustomScrollbars from "util/CustomScrollbars";
import Auxiliary from "util/Auxiliary";


class Timer extends React.Component {
          constructor(props) {
            super(props);
            this.state = { seconds: 0 };
          }

          tick() {
            this.setState(prevState => ({
              seconds: prevState.seconds + 1
            }));
          }

          componentDidMount() {
            this.interval = setInterval(() => this.tick(), 5000);
          }

          componentWillUnmount() {
            clearInterval(this.interval);
          }

          render() {
            console.log(this.state.seconds)
            return (
              
            );
          }
        }

export default Timer;
