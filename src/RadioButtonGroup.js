import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";

class RadioButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relevancyChecked: true,
            popularityChecked: false,
            newestChecked: false,
        }
    }
    render() {
        return (
            <View style={styles.radioButtonContainer}>
                <View style={this.state.relevancyChecked?styles.checkedIcon:styles.unCheckedIcon}>
                    <TouchableOpacity onPress={() => {
                        this.props.homeComponent.setState({sortType: '&sortBy=relevancy'});
                        this.setState({relevancyChecked: true,
                            popularityChecked: false, newestChecked: false,})
                    }}>
                        <Text style={styles.radioButtonText}>Most Relevant</Text>
                    </TouchableOpacity>
                </View>


                <View style={this.state.popularityChecked?styles.checkedIcon:styles.unCheckedIcon}>
                    <TouchableOpacity onPress={() => {
                        this.props.homeComponent.setState({sortType: '&sortBy=popularity'});
                        this.setState({
                            relevancyChecked: false,
                            popularityChecked: true, newestChecked: false,})
                    }}>
                        <Text style={styles.radioButtonText}>Most Popular</Text>
                    </TouchableOpacity>
                </View>

                <View style={this.state.newestChecked?styles.checkedIcon:styles.unCheckedIcon} >
                    <TouchableOpacity onPress={() => {
                        this.props.homeComponent.setState({sortType: '&sortBy=publishedAt'});
                        this.setState({
                            relevancyChecked: false,
                            popularityChecked: false, newestChecked: true,})
                    }}>
                        <Text style={styles.radioButtonText}>Newest</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
    },
    radioButton: {

        justifyContent: "center"
    },
    checkedIcon: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#98CFB6",
        width: '33%',
        padding: 10,

    },
    unCheckedIcon: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'transparent',
        width: '33%',
        padding: 10,
    },
    radioButtonText: {
        //fontSize: 16,
    }
})



export default RadioButtonGroup;

