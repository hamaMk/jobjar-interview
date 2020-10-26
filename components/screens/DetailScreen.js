import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Linking, Button, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

class DetailScreen extends React.Component{

    render(){

        const { navigation, route } = this.props;
        const selectedRecord = route.params.objectnumber
        const record = this.props.records.find((e) => e.objectnumber === selectedRecord)
        // console.log(route.params)
        // console.log(record.primaryimageurl)
        // console.log(record.provenance)

        const RenderImage = () => {
            if (record.primaryimageurl != null){
                return (
                    <Image
                        style={styles.image}
                        source={{
                            uri: record.primaryimageurl,
                        }}
                    />
                )
            } else {
                return (
                    <View style={styles.imgPlaceholder}>
                        <Text style={styles.lbl}>NO IMAGE FOUND</Text>
                    </View>
                )
            }
        }

        return( 
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <RenderImage></RenderImage>
                <Text>Provenance</Text>
                <Text>{record.provenance}</Text>
                <Button
                title="Click for more info"
                onPress={() => {
                    Linking.openURL(record.url)
                }}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    imgPlaceholder: {
        backgroundColor: 'skyblue',
        flex: 1,
        textAlign: "center",
        width: '100',
        marginBottom: 15
    },
    lbl: {
        alignSelf: 'center',
    }
});

const mapStateToProps = state => ({
    records: state.records,
});

export default connect(mapStateToProps)(DetailScreen)