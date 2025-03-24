import React, { useState,useRef,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,SafeAreaView,StatusBar,Image, ImageBackground,Platform,PermissionsAndroid,ToastAndroid,ActivityIndicator,Modal,Button} from 'react-native';
import { useTheme } from '../../ComComponents/ThemeContext';
import ComColors from '../../ComComponents/Colors';
import { Fonts, LinearButton } from '../../ComComponents';
import { useNavigation,  } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import 'text-encoding';
import RNFetchBlob from 'rn-fetch-blob';
import QRCode from 'react-native-qrcode-svg';
import RNFS from "react-native-fs";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import ViewShot from 'react-native-view-shot';
import { API_URL4002, API_URL4004, API_URL4006, DocumentPath } from '../../Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { TextInput } from 'react-native-paper';


export default  function CertificatePreview({route}) {
    const navigation = useNavigation(); 
    const { theme } = useTheme();
    const ref = useRef();
    const viewShotRef = useRef(null);
    const [Images, setImages] = useState(null)
    const [names, setNames] = useState("")
    const [certificate, setCerificate] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    const [isLoading1 , setIsLoading1] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [email, setEmail] = useState('')
    const [certNum, setCertNum] = useState('')

    const {course,test} = route?.params
    const {formattedDate1 }= route?.params
 

    const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });


    useEffect(() => {
      getName();
      getProfile();
    }, []);

    const getProfile = async () => {
      const user_id = await AsyncStorage.getItem('_id');
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + accessToken);
      var raw = JSON.stringify({
        "user_id": user_id
      });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch(API_URL4002 + "getUserProfile", requestOptions)
        .then(response => response.json())
        .then(async result => {
          if (result.status == true) {
            // setNames(result.userdata.name)
            if (route?.params?.name !== undefined) {
              setNames(route.params.name);
            } else {
              // Keep the current `names` state or set it to a default value if needed
              setNames(result.userdata.name)    
            }
            // setIsPayed(result.userdata.isSubscribed)
            setEmail(result?.userdata?.email)
          }
          else {
          }
        })
        .catch(error => console.log('error', error));
    }

    const getName = async () =>{
      const name = await AsyncStorage.getItem('name')
      const certificate = await AsyncStorage.getItem('certificate')
      // setNames(name)
      setCerificate(certificate)

      if (route?.params !== undefined) {
        const {certificate,certificateNumber} = route?.params;
        setImages(certificate)
        setCertNum(certificateNumber)
        }
    }

    const captureAndSendToBackend = async () => {
      if(names == ""){
        setModalVisible(true)
        return;
      }
      
      try {
        setIsLoading(true)
        const uri = await viewShotRef.current.capture();
    
        const formData = new FormData();
        const fileName = `image_${Date.now()}.png`;
    
        // For iOS, use `uri` directly; for Android, prepend 'file://'
        const fileUri = Platform.OS === 'android' ? uri : uri;

    
        formData.append('name', fileName);
        formData.append('type', 'image/png');
        formData.append('uri', fileUri);

        const photo = {
          uri: fileUri,
          type: "image/png",
          name: fileName,
        };
        saveCertificate(photo)
      } catch (error) {
        setIsLoading(false)
      }
    };

    const requestStoragePermission = async () => {
      try {
        if (Platform.OS === "android") {
          console.log("Android Version:", Platform.Version);
    
          if (Platform.Version >= 34) {
            console.log("Android 14+ detected. Using Photo Picker instead.");
            return true; // Android 14+ should use Photo Picker instead of direct permission
          } else if (Platform.Version >= 33) {
            console.log("Requesting READ_MEDIA_IMAGES permission...");
            const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            console.log("Permission Response:", result);
            return result === RESULTS.GRANTED;
          } else if (Platform.Version >= 29) {
            console.log("No permission needed for app-private storage (Android 10+)");
            return true;
          } else {
            console.log("Requesting WRITE_EXTERNAL_STORAGE permission...");
            const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            console.log("Permission Response:", result);
            return result === RESULTS.GRANTED;
          }
        } else if (Platform.OS === "ios") {
          console.log("Requesting iOS PHOTO_LIBRARY permission...");
          const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
          console.log("iOS Permission Response:", result);
          return result === RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn("Permission Error:", err);
        return false;
      }
    };

    const captureAndSendToBackend1 = async () => {
      // const hasPermission = await requestStoragePermission();
      // console.log(hasPermission);
      

      // if (!hasPermission) {
      //   ToastAndroid.show("Storage permission is required!", ToastAndroid.SHORT);
      //   return;
      // }

     try {
            setIsLoading(true);
            if (viewShotRef.current) {
              const uri = await viewShotRef.current.capture(); // Captures the image and gets file URI
              saveImageToGallery(uri);
            }
          } catch (error) {
            console.error('Error capturing image:', error);
            ToastAndroid.show('Error', 'Failed to capture image.', ToastAndroid.SHORT);
          } finally {
            setIsLoading(false);
          }
    };



    const save = () => {
      viewShotRef.current.capture((data) => {
        RNFS.writeFile(RNFS.CachesDirectoryPath + "/some-name.png", data, "base64")
          .then(() => {
            setTimeout(() => {
              const filePath = RNFS.CachesDirectoryPath + "/some-name.png";
              const fileName = "photo";
              // sendmail(filePath, fileName);
            }, 5000); // 3000 milliseconds = 3 seconds
            return CameraRoll.saveAsset(
              RNFS.CachesDirectoryPath + "/some-name.png",
              "photo"
            );
          })
          .then(() => {
            ToastAndroid.show("Saved to gallery !!", ToastAndroid.SHORT);
          });
      });
    };

   
   
    const downloadImage = (image) => {
      // Main function to download the image
      setIsLoading1(false)

      // To add the time suffix in filename
      let date = new Date();
      // Image URL which we want to download
      let image_URL = image;    
      // Getting the extention of the file
      let ext = getExtention(image_URL);
      ext = '.' + ext[0];
      // Get config and fs from RNFetchBlob
      // config: To pass the downloading related options
      // fs: Directory path where we want our image to download
      const { config, fs } = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' + 
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };
      config(options)
        .fetch('GET', image_URL)
        .then(res => {
          // Showing alert after successful downloading
          alert('Image Downloaded Successfully.');
        })
        .catch((err) => {
          console.error("Download Error:", err);
        });
    
    };
  
    const getExtention = filename => {
      // To get the file extension
      return /[.]/.exec(filename) ?
               /[^.]+$/.exec(filename) : undefined;
    };

    const saveCertificate = async (image) =>{
      const user_id = await AsyncStorage.getItem('_id');
      const accessToken = await AsyncStorage.getItem('accessToken');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+accessToken);
      var formdata = new FormData();
      formdata.append("document", image);
      formdata.append("category_id", test);
      formdata.append("user_id", user_id);
      formdata.append("name", names);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };


      fetch(API_URL4004+"saveCertificate", requestOptions)
        .then(response => response.json())
        .then(async result => {
          if(result.Status == true){
            await AsyncStorage.setItem('certificate',result.response.certificateName)
            // setQrImage(result.response.certificateName)
            const REMOTE_IMAGE_PATH =
            DocumentPath + result.response.certificateName
            ToastAndroid.show("Certificate generated successfully!", ToastAndroid.SHORT);
            navigation.replace('Certificate')
            setIsLoading(false)
            if (Platform.OS === 'ios') {
              // downloadImage(REMOTE_IMAGE_PATH);
            } else {
             
            }
          }
         else{
          setIsLoading(false)
         }
        })
        .catch(error => {
          saveCertificate(image)});
    }
  
    const saveCertificate1 = async (image) =>{
      
      const certificate = await AsyncStorage.getItem('certificate')

              const REMOTE_IMAGE_PATH =
              DocumentPath + certificate
              if (Platform.OS === 'ios') {
                downloadImage(REMOTE_IMAGE_PATH);
              } else {
               downloadImage(REMOTE_IMAGE_PATH);
              }
            
          }

            const saveImageToGallery = async (imageUri) => {
                try {
                  if (!imageUri) {
                    ToastAndroid.show('Error: Captured image URI is invalid.', ToastAndroid.SHORT);
                    return;
                  }
              
                  if (Platform.OS === 'android' && Platform.Version >= 29) {
                    // Android 10+ (Scoped Storage)
                    await CameraRoll.save(imageUri, { type: 'photo' });
                    ToastAndroid.show('Image saved to gallery.', ToastAndroid.SHORT);
                  } else {
                    // Android 9 and below (Needs permissions)
                    const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                      {
                        title: 'Storage Permission',
                        message: 'App needs access to save images to your gallery.',
                        buttonPositive: 'OK',
                      }
                    );
              
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                      ToastAndroid.show('Error: Storage permission denied.', ToastAndroid.SHORT);
                      return;
                    }
              
                    let { fs } = RNFetchBlob;
                    let PictureDir = fs.dirs.PictureDir;
                    let fileName = `image_${Date.now()}.png`;
                    let filePath = `${PictureDir}/${fileName}`;
              
                    console.log('Saving image from:', imageUri);
                    console.log('Saving image to:', filePath);
              
                    await RNFetchBlob.fs.cp(imageUri, filePath);
              
                    // Verify if the file exists
                    const fileExists = await RNFetchBlob.fs.exists(filePath);
                    if (!fileExists) {
                      ToastAndroid.show('Error: File saving failed.', ToastAndroid.SHORT);
                      return;
                    }
              
                    // Notify Android to scan the new file (Fix: Ensure correct parameters)
                    RNFetchBlob.android.addCompleteDownload({
                      title: 'Image Download',
                      description: 'Your image has been downloaded successfully',
                      mime: 'image/png',
                      path: filePath,  // Ensure this is a valid file path, not a URI
                      showNotification: true,
                      mediaScannable: true,  // Fix: Ensures the image appears in the gallery
                    });
              
                    ToastAndroid.show('Image saved successfully!', ToastAndroid.SHORT);
                  }
                } catch (error) {
                  console.error('Save Error:', error);
                  ToastAndroid.show('Error: Failed to save image.', ToastAndroid.SHORT);
                }
              };
            

          const handleUpdate = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer "+accessToken);
            var raw = JSON.stringify({
              "name": inputValue,
              "email": email,
            });
        
        
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
        
            fetch(API_URL4006 + "userBasicDetails", requestOptions)
              .then(response => response.json())
              .then(async result => {
                if (result.Status === true) {
                  ToastAndroid.show(result.message, ToastAndroid.SHORT);
                  setModalVisible(false);
                  getProfile();
                }
              })
              .catch(error => {
                setIsLoading(false)});
          }
        

       
        
       
    return (
      <SafeAreaView  style={{backgroundColor: theme === 'dark' ? ComColors.dark.colors.background : ComColors.light.colors.background,flex:1}}>
      <StatusBar backgroundColor={theme === 'dark' ? ComColors.dark.colors.background : 
                 ComColors.light.colors.background} barStyle="dark-content" />

        <View style={{ marginTop: 0, marginLeft: 24, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Image source={require('../../Assets/Left.png')} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            <Text style={[styles.privtext,{color:theme === 'dark' ? ComColors.dark.colors.white : ComColors.light.colors.black,fontFamily:Fonts.fontOpenSanSemiBold}]}>{course?.length > 15 ? `${course?.slice(0, 15)}...` : course}</Text>
            </View>
           
            {names === "" && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Full Name</Text>
              {/* <TextInput
                style={[
                  styles.textInput,
                  { color: theme === 'dark' ? ComColors.dark.colors.black : ComColors.light.colors.black }
                ]}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Type your name"
              /> */}
              <TextInput
  mode="outlined" 
  label="Type your name"
  value={inputValue}
  onChangeText={setInputValue}
  theme={{
    colors: {
      placeholder: theme === 'dark' ? 'gray' : 'darkgray', // Adjust placeholder color
      primary: 'gray'
    }
  }}
  
  style={[
    styles.textInput,
    { color: theme === 'dark' ? ComColors.dark.colors.black : ComColors.light.colors.black}
  ]}
/>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
           
            <View style={styles.container}>
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 1 }}
        style={{ width: '100%', height: '80%'}}
      >
      <View style={{
        flex:1,
      }}>
        <Image
          source={require('../../Assets/certificate2.png')}
          style={styles.image}
        />
        </View>
          <View style={styles.overlay}>
            <View style={{
          top:0             
              }}>
            <Text style={styles.name1}>{names}</Text>
            </View>

          {/ <Text style={styles.name1}>{names}</Text> /}
            <Text style={styles.name}>{course}</Text>
            <Text style={styles.issue}>Issued on {formattedDate}</Text>
            <Text style={{textAlign:'center',paddingBottom:10,fontSize:12, fontFamily:Fonts.fontCardoRegular,color:'black',top:40}}>
            Certificate Number: {certNum}</Text>
            <View style={{alignItems:'center',top:40}}>
            <QRCode
                size={50}
                value={DocumentPath + certificate}
                logoSize={60}
                logoBackgroundColor='transparent'
              />
         
            </View>
            {/ <Text style={{ marginRight: 30,fontSize:10,color:theme === 'dark' ? ComColors.dark.colors.white : ComColors.light.colors.black,fontFamily:Fonts.fontOpenSanRegular}}>{formattedDate}</Text> /}
          </View>
          {/* <Text
            style={{
              marginTop: 220,
              marginLeft: 310,
              color: ComColors.commonColor.colors.themecolor,
              fontFamily:Fonts.fontOpenSanRegular
            }}
          >
          </Text> */}
      </ViewShot>
    </View>
    <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 24, marginRight: 24,alignSelf:'center' }}>
        {!Images ?       
           <TouchableOpacity style={{ backgroundColor: theme === 'dark' ? ComColors.light.colors.lighttheme : ComColors.dark.colors.lighttheme, borderRadius: 20, width: 150, height: 35, justifyContent: 'center', }} onPress={captureAndSendToBackend}>
           {isLoading ?  (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <ActivityIndicator color={'black'} size={'small'} />
                  </View>
                ):(
                <Text style={{ color:theme === 'dark' ? ComColors.dark.colors.white : ComColors.light.colors.black, fontSize: 16, textAlign: 'center',fontFamily:Fonts.fontOpenSanRegular }}>{names == "" ? 'Update Name' : 'Generate'}</Text>
                )}
                </TouchableOpacity> : null
}
                {/ <Text style={{color:theme === 'dark' ? ComColors.dark.colors.white : ComColors.light.colors.black,marginTop:5}}>{names == "" ? 'Plaese Update Name In Profile' : null}</Text> /}
            {
              Images  ?
              <TouchableOpacity style={{ backgroundColor: ComColors.commonColor.colors.themecolor, borderRadius: 20, width: 100, height: 35, justifyContent: 'center',marginBottom:0}} onPress={captureAndSendToBackend1}>
             {isLoading1 ?  (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                        <ActivityIndicator color={'black'} size={'small'} />
                  </View>
                ):(
              <Text style={{ color:theme === 'dark' ? ComColors.dark.colors.white : ComColors.light.colors.black, fontSize: 16, textAlign: 'center',fontFamily:Fonts.fontOpenSanRegular }}>
              Download
              </Text>
              )}
            </TouchableOpacity>
            : null
            }
           
            
          </View>
             {/* <View style={{alignItems: 'center'}}>
             <Text style={{color:theme === 'dark' ? ComColors.dark.colors.white : ComColors.light.colors.black,marginBottom:5,fontFamily:Fonts.fontOpenSanRegular}}>Use this Certificate &</Text>
             <Text style={{color:theme === 'dark' ? ComColors.dark.colors.white : ComColors.light.colors.black,marginBottom:50,fontFamily:Fonts.fontOpenSanRegular}}>Get Addicted By Bodsphere</Text>
             </View>
                */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  	splash: {
    // backgroundColor: "rgba(28, 28, 30, 1)",
    flex:1
},
  privtext:{ marginLeft: '20%',fontSize:Fonts.txt20 },
  verify:{fontSize:15,fontFamily:Fonts.fontfamily,flexWrap:'wrap'},
  email:{
    fontSize:Fonts.txt16,
    fontFamily:Fonts.fontfamily,
    fontWeight:'400'
  },
  upgrade:{flexDirection:'row',marginLeft:15,marginRight:15},
  container: {
    flex: 0.96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
  height: '100%',
 width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft:80,
    marginTop:'10%',
    textAlign:'center'
  },
  name: {
    fontSize: 18,
    color: 'black',
    // marginBottom: 5,
    textAlign:'center',
   fontFamily:Fonts.fontCardoRegular,
   top:32
 //  bottom:20
  },
  name1: {
    fontSize: 25,
    color: '#b8860b',
   textAlign:'center',
   fontFamily:Fonts.fontCardoRegular,
    paddingBottom:20,
  },
  issue: {
    fontSize: 12,
   textAlign:'center',
   fontFamily:Fonts.fontCardoRegular,
   color:'black',
   top:40

  },
  signature: {
    fontSize: 16,
    color: 'black',
    marginTop:'10%',
    // marginLeft:'10%',
    borderTopWidth:0.7
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    // borderWidth: 1,
    marginBottom: 20,
    paddingBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop:20
  },
  button: {
    backgroundColor: ComColors.commonColor.colors.themecolor,
        paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  openButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
})