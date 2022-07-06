import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export const DateManager = ({homeComponent}) => {
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [endDate, setEndDate] = useState(new Date(Date.now()));
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const onChangeStart = (event, selectedDate) => {
        setShowStart(false);
        setStartDate(selectedDate);
        homeComponent.setState({fromDate: '&from=' + startDate.toISOString().split('T')[0],
            toDate: '&to=' + endDate.toISOString().split('T')[0]})
    };

    const onChangeEnd = (event, selectedDate) => {
        setShowEnd(false);
        setEndDate(selectedDate);
        homeComponent.setState({fromDate: '&from=' + startDate.toISOString().split('T')[0],
            toDate: '&to=' + endDate.toISOString().split('T')[0]})
    };

    return (
        <View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={()=>setShowStart(true)}>
                    <Text style={styles.text}>{'Start Date'}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={()=>setShowEnd(true)}>
                    <Text style={styles.text}>{'End Date'}</Text>
                </Pressable>

            </View>

            {showStart && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode='date'
                    display="default"
                    onChange={onChangeStart}
                    maximumDate={endDate}
                />
            )}

            {showEnd && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode='date'
                    display="default"
                    onChange={onChangeEnd}
                    minimumDate={startDate}
                    maximumDate={new Date(Date.now())}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        border: 'none',
        backgroundColor: 'none',
        width: '50%',
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        margin: 10,
    }

});