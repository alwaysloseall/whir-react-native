/**
 * 可触控组件多次点击fix
 * @flow
 */

import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

export default class TouchFix extends Component<any> {
    state = {
        isDisable: false
    };

    timer = null

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    ToPress = async () => {
        const { onPress } = this.props;
        await this.setState({ isDisable: true }); //防重复点击
        this.timer = setTimeout(() => {
            this.setState({ isDisable: false }); //1秒后可点击
        }, 1000);
        onPress && onPress();
    };

    render() {
        return (
            <TouchableOpacity
                disabled={this.state.isDisable}
                {...this.props}
                onPress={this.ToPress}
            >
                {this.props.children}
            </TouchableOpacity>
        );
    }
}
