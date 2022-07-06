import {StyleSheet, Text, View, Alert, FlatList, SafeAreaView} from 'react-native';
import React, {Component} from "react";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import {API_KEY} from '@env'
import SearchBar from 'react-native-dynamic-search-bar';
import {DateManager} from "./DateManager";
import RadioButtonGroup from "./RadioButtonGroup";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searched: '',
            data: [],
            page: 1,
            loading: false,
            loadingStart: false,
            fromDate: '',
            toDate: '',
            sortType: '',
        }
    }

    fetchData = async (ifReload) => {

        this.setState({loading: true});
        const encodedSearched = encodeURI(this.state.searched);
        const text = 'https://newsapi.org/v2/everything?apiKey=' + API_KEY +
            '&q=' + encodedSearched + '&pageSize=5&page=' + this.state.page
        + this.state.fromDate + this.state.toDate + this.state.sortType;
        const response = await fetch(text);
        const json = await response.json();
        if (json.status === 'ok' && !ifReload) {
            this.setState(state => ({
                data: [...state.data, ...json.articles],
            }));
        } else if (json.status === 'ok' && ifReload) {
            if(json.totalResults === 0){
                Alert.alert('Found no matches.');
            }
            this.setState(state => ({
                data: json.articles,
            }));
        } else {
            Alert.alert(json.message);
        }
        this.setState({loading: false, loadingStart: false});
    }

    handleEnd = () => {
        this.setState(state => ({page: state.page + 1}), () => this.fetchData(false));
    }
    handleSearch = () => {
        this.setState(state => ({page: 1}), () => this.fetchData(true));
    }

    handleNewsPress = (title, author) => {
        this.props.navigation.navigate('View', {title, author}, );
    }

    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                <SearchBar
                    style={styles.searchbar}
                    placeholder="Type Here..."
                    value={this.state.searched}
                    onChangeText={(value)=>this.setState({searched: value})}
                    onSearchPress={this.handleSearch}
                />

                <DateManager homeComponent={this}/>
                <RadioButtonGroup homeComponent={this}/>

                <FlatList data={this.state.data}

                          renderItem={({item}) =>(
                              <View style={styles.view}>
                                  <TouchableOpacity onPress={()=>this.handleNewsPress(item.title, item.author)}>
                                      <Text style={styles.h1}>{item.title}</Text>
                                      <Text style={styles.h2}>{item.description}</Text>
                                  </TouchableOpacity>
                              </View>)}

                          keyExtractor={(x,i)=>i}
                          onEndReached={()=>this.handleEnd()}
                          onEndReachedThreshold={0.5}
                          ListFooterComponent={()=>
                              this.state.loading
                                  ?<ActivityIndicator size='large' animating/>
                                  :null
                          }
                />
            </SafeAreaView>
        );
    }


}

const styles = StyleSheet.create({
    h1: {
      fontWeight: 'bold',
    },
    h2: {
        fontWeight: 'normal',
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    searchbar: {
        margin: 10,
        //marginTop: 0,
    },
    view: {
        margin: 20,
        padding: 25,
        borderWidth: 2,
    }
});