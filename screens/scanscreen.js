import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions  from 'expo-permissions';

export default class Scanscreen extends React.Component {
constructor(){
super();
this.state={
hasCameraPermissions:null,
scanned:false,
scannedData:'',
buttonState:'normal',
}
}

handleBarCodeScanned = async({type, data})=>{ 
this.setState({ 
scanned: true, 
scannedData: data, 
buttonState: 'normal' 
}); }

getCameraPermissions=async()=>{
const {status}=await Permissions.askAsync(Permissions.CAMERA);
this.setState({
hasCameraPermissions:status==='granted',
buttonState:'clicked',
scanned:false,
})
}
render(){
const hasCameraPermissions=this.state.hasCameraPermissions
const scanned=this.state.scanned
const buttonState=this.state.buttonState;
if(buttonState=='clicked'&& hasCameraPermissions){
return(
<BarCodeScanner style={StyleSheet.absoluteFillObject}
onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
/>
)
}else if (buttonState==='normal'){
return (
<View style={styles.container}>
<Text style={styles.displayText}>{hasCameraPermissions==true?this.state.scannedData:'Request Camera Permission'}</Text>
<TouchableOpacity style={styles.scanButton}
onPress={this.getCameraPermissions}><Text style={styles.buttonText}>Scan QR Code</Text></TouchableOpacity>
</View>
);
}

}
}

const styles = StyleSheet.create({ 
container: { flex: 1,
justifyContent: 'center', 
alignItems: 'center' 
}, 
displayText:{ fontSize: 15, 
textDecorationLine: 'underline' 
}, 
scanButton:{ 
backgroundColor: '#2196F3', 
padding: 10, margin: 10 
}, 
buttonText:{ 
fontSize: 20, 
} 
});