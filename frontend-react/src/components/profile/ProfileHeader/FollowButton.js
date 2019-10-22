import React, { Component } from "react";
//import { follow, unfollow } from "./apiUser";
import {Button} from "antd";


class FollowButton extends Component {
    followClick = () => {
//        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
//        this.props.onButtonClick(unfollow);
    };

    render() {
        return (
            <div className="d-inline-block">
                {!this.props.following ? (
                    <Button style={{width: "100%"}}
                        onClick={this.followClick}
                    >
                        Obserwuj
                    </Button>
                ) : (
                    <Button style={{width: "100%"}}
                        onClick={this.unfollowClick}
                    >
                        Przestań obserwować
                    </Button>
                )}
            </div>
        );
    }
}

export default FollowButton;
