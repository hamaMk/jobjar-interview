import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Linking, Button, Image, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class DetailScreen extends React.Component{

    render(){
        const { navigation, route } = this.props;
        const selectedRecord = route.params.objectnumber
        const record = this.props.records.find((e) => e.objectnumber === selectedRecord)
        // console.log(record.provenance)

        const RenderImage = ({image}) => {
            try {
                if (image === undefined || image === null){
                    return (
                        <View style={styles.noImgPlaceholder}>
                            <Text style={styles.headings}>NO IMAGE FOUND</Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.imgPlaceholder}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: image,
                                }}
                            />
                        </View>
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }

        const RenderVerificatioLevel = () => {
            if (record.verificationlevel > 0){
                return(
                    <Text style={styles.headings}>ART INFO <FontAwesomeIcon style={styles.checkIcon} icon={ faCheckCircle } /></Text>
                )
            }else{
                return(
                    <Text style={styles.headings}>ART INFO <FontAwesomeIcon style={styles.timesIcon} icon={ faTimesCircle } /></Text>
                )
            }
        }

        return( 
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.imgContainer}>
                        <RenderImage image={record.primaryimageurl}/>
                    </View>
                    <View style={styles.artInfoSection}>
                        <RenderVerificatioLevel/>
                    </View>
                    <Text style={styles.section}>Division: {record.division}</Text>
                    <Text style={styles.section}>Artist: {record.artist}</Text>
                    <Text style={styles.section}>Medium: {record.medium}</Text>
                    <Text style={styles.section}>Description: {record.description}</Text>
                    <View style={styles.provenanceSection}>
                        <Text style={styles.headings}>Provenance</Text>
                        <Text>{record.provenance}</Text>
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback 
                        onPress={() => {
                            Linking.openURL(record.url)
                        }}
                    >
                    <Text style={styles.btn}>Click for more info</Text>
                    </TouchableWithoutFeedback>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 5,
        paddingRight: 5,
        // paddingTop: 5
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    imgContainer: {

    },
    noImgPlaceholder: {
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    imgPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    lbl: {
        alignSelf: 'center',
    },
    checkIcon: {
        color: 'green'
    },
    timesIcon: {
        color: 'red'
    },
    provenanceSection: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    btn: {
        backgroundColor: 'skyblue',
        color: 'white',
        padding: 8
    }, 
    headings: {
        fontWeight: "bold"
    },
    section: {
        marginBottom: 5
    },
    artInfoSection:{
        marginTop: 50,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
});

const mapStateToProps = state => ({
    records: state.records,
});

export default connect(mapStateToProps)(DetailScreen)