import React from 'react';
import { Text, View, TouchableOpacity,Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Scanscreen extends React.Component {
constructor(){
super();
this.state = {
hasCameraPermissions: null,
scanned: false,
scannedData: '',
buttonState: 'normal'
}
}

getCameraPermissions = async () =>{
const {status} = await Permissions.askAsync(Permissions.CAMERA);

this.setState({
/*status === "granted" is true when user has granted permission
status === "granted" is false when user has not granted the permission
*/
hasCameraPermissions: status === "granted",
buttonState: 'clicked',
scanned: false
});
}

handleBarCodeScanned = async({type, data})=>{
this.setState({
scanned: true,
scannedData: data,
buttonState: 'normal'
});
}

render() {
const hasCameraPermissions = this.state.hasCameraPermissions;
const scanned = this.state.scanned;
const buttonState = this.state.buttonState;

if (buttonState === "clicked" && hasCameraPermissions){
return(
<BarCodeScanner
onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
style={StyleSheet.absoluteFillObject}
/>
);
}

else if (buttonState === "normal"){
return(
<View style={styles.container}>
<View>
<Image
style={styles.imageIcon}
source={require('../assets/t.jpg')}
/>
<Text style={{textAlign: 'center', fontSize: 30,textDecorationLine: 'underline',
textDecorationColor : 'blue'}}>Bar Code Scanner</Text>
</View>
<Text style={styles.displayText}>{
hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
}</Text>     

<TouchableOpacity
onPress={this.getCameraPermissions}
style= {styles.scanButtonText} 
title = "Bar Code Scanner">
<Text style={styles.QRbuttonText}>Scan QR Code</Text>
</TouchableOpacity>
</View>
);
}
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center'

},
displayText:{
fontSize: 15,
textDecorationLine: 'underline',
textDecorationColor : 'red',
color : 'black'
},
scanButtonText:{
backgroundColor: '#2196F3',
padding: 10,
margin: 10,
borderRadius: 0,
borderColor : 'black',
borderWidth : 3
},
QRbuttonText:{
fontSize: 20,
fontWeight: 'bold'
},
imageIcon: {
width: 200,
height: 200,
marginLeft:-14,
},
});