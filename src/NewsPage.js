import {
    StyleSheet,
    Text,
    Alert,
    Image,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import React, {Component} from "react";
import {API_KEY} from '@env';


export default class NewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }
    }
    fetchData = async () => {
        const author = this.props.navigation.state.params.author;
        const title = this.props.navigation.state.params.title;
        const text = 'https://newsapi.org/v2/everything?apiKey='+API_KEY+
            '&qInTitle='+title;
        const response = await fetch(text);
        const json = await response.json();
        if(json.status!=='ok'){
            this.props.navigation.navigate('News', );
            Alert.alert(json.message);
        }else if(json.totalResults<1){
            this.props.navigation.navigate('News', );
            Alert.alert("Cannot find needed news.");
        }else if(json.totalResults>1) {
            json.articles.filter((item) => item.author!==author);
            this.setState(state => ({
                data: json.articles[0],
                loading: false,
            }));
        }else{
            this.setState(state => ({
                data: json.articles[0],
                loading: false,
            }));
        }
    }

    componentDidMount = () => {
        this.setState(state => ({page: state.page + 1}), () => this.fetchData());
    }


    render() {

        if(this.state.loading){
            return (
                <SafeAreaView style={styles.droidSafeArea}>
                    <ActivityIndicator size='large' animating/>
                </SafeAreaView>
            )
        }else{
            return (
                <SafeAreaView style={styles.droidSafeArea}>
                    <Text style={styles.h1}>{this.state.data.title}</Text>
                    <Image
                        style={styles.image}
                        source={{
                            uri: this.state.data.urlToImage,
                        }}
                    />
                    <Text style={styles.h2}>{this.state.data.description}</Text>
                    <Text style={styles.h3}>{'Author: '+this.state.data.author + '.'}</Text>
                    <Text style={styles.h3}>{'Source: '+this.state.data.source.name + '.'}</Text>
                    <Text style={styles.h3}>
                        {
                            'Published at '+new Date(this.state.data.publishedAt
                                .replace('Z','')).toUTCString() + '.'
                        }
                    </Text>

                </SafeAreaView>
            );
        }

    }


}

const styles = StyleSheet.create({
    image: {
        width: "90%",
        padding: 100,
        margin: 20,
    },
    h1: {
        fontWeight: 'bold',
        margin: 20,
        fontSize: 18,
    },
    h3: {
        fontWeight: 'normal',
        margin: 10,
        marginRight: 20,
        marginLeft: 20,
    },
    h2: {
        fontWeight: 'normal',
        margin: 20,
        fontSize: 16,
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});
