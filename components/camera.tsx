import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null); // Camera reference
  const [capturedImage, setCapturedImage] = useState<string | undefined>('');
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  if (!mediaPermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to save photos to your gallery
        </Text>
        <Button onPress={requestMediaPermission} title="Grant Media Permission" />
      </View>
    );
  }

  // Toggle between front and back camera
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

 // Take picture
 const takePicture = async () => {
  if (cameraRef.current) {
    try {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo?.uri);
      setCapturedImage(photo?.uri);
      if (photo?.uri) {
        saveToGallery(photo.uri); // Save the photo to gallery
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }
};

  // Save image to gallery
  const saveToGallery = async (uri: string) => {
    try {
      if (uri) {
        await MediaLibrary.saveToLibraryAsync(uri);
        alert('Photo saved to gallery!');
      }
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <Image source={{ uri: capturedImage }} style={{ flex: 1 }} />
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Capture Photo</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
