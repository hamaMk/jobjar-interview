import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableWithoutFeedback, Image, ActivityIndicator} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { GET_RECORDS, TOGGLE_LOADING } from '../../src/redux/actionTypes'


class HomeScreen extends React.Component{

    componentDidMount() {
        this.props.dispatch({type: TOGGLE_LOADING, status: true})  
        axios.get(`https://api.harvardartmuseums.org/object/`, {
            params: {
                apikey: '61d07ab5-3187-4d94-983e-78e917f4b58e'
            }
        })
            .then(res => {
            const records = res.data.records;
            // console.log(records)
            this.props.dispatch({type: TOGGLE_LOADING, status: false})  
            this.props.dispatch({type: GET_RECORDS, records: records})  
        })
        .catch(function(error) {
            console.log(error);
        });
    }


    render(){

        const { navigation } = this.props;

        const Art = ({ title, primaryimageurl, displayname, culture, objectnumber}) => (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Details', {objectnumber: objectnumber})} underlayColor="white">
                <View style={styles.item}>
                    <Text style={styles.title}>{title}</Text>
                    <Image
                        style={styles.image}
                        source={{
                            uri: primaryimageurl,
                        }}
                    />
                    <Text style={styles.title}>{displayname}</Text>
                    <Text style={styles.title}>{culture}</Text>
                </View>
            </TouchableWithoutFeedback>
        );

        const renderItem = ({ item }) => (
            <Art 
                key={item.objectnumber}
                title={item.title} 
                primaryimageurl={item.primaryimageurl} 
                displayname={item.role} 
                culture={item.culture} 
                objectnumber={item.objectnumber}
            />
        );

        if (this.props.loading){
            return (
                <SafeAreaView style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="skyblue" />
                </SafeAreaView>
            )
        }else{
            return(
                <SafeAreaView style={styles.container}>
                    <StatusBar style="auto" />
                    <FlatList
                        data={this.props.records}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2} 
                    />
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    item: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'skyblue',
        margin: 5,
        height: 230
    },
    image: {
        width: 90,
        height: 100,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
    }
});

const mapStateToProps = state => ({
    records: state.records,
    loading: state.loading,
});

export default connect(mapStateToProps)(HomeScreen)