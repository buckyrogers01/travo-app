import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { uploadGuideDocuments } from "../store/slices/guideSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import api from "../api/axios";

const ID_TYPES = ["Aadhaar", "Passport", "Driving License"];

export default function VerificationDocumentsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.guide);

  const [idType, setIdType] = useState("Aadhaar");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // ✅ IMPORTANT: store ImagePickerAsset (NOT string)
  const [idFront, setIdFront] = useState<ImagePickerAsset | null>(null);
  const [idBack, setIdBack] = useState<ImagePickerAsset | null>(null);
  const [certificate, setCertificate] = useState<ImagePickerAsset | null>(null);

  // ✅ Correct image picker
  const pickImage = async (
    setter: (asset: ImagePickerAsset) => void
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: false,          // important
    });

    if (!result.canceled) {
      setter(result.assets[0]);
    }
  };

const assetToFormDataFile = async (asset: ImagePickerAsset) => {
  // 🌐 EXPO WEB (VERY IMPORTANT)
  if (Platform.OS === "web") {
    const response = await fetch(asset.uri);
    const blob = await response.blob();

    return new File(
      [blob],
      asset.fileName || `file_${Date.now()}.jpg`,
      { type: asset.mimeType || blob.type || "image/jpeg" }
    );
  }

  // 📱 ANDROID / IOS
  return {
    uri: asset.uri,
    name: asset.fileName || `file_${Date.now()}.jpg`,
    type: asset.mimeType || "image/jpeg",
  } as any;
};


  // ✅ FINAL handleSubmit (MATCHES CURL)
const handleSubmit = async () => {
  if (!idFront || !idBack) {
    Alert.alert("Error", "Please upload both ID images");
    return;
  }

  const guideId = await AsyncStorage.getItem("guideId");
  if (!guideId) {
    Alert.alert("Error", "Guide ID not found");
    return;
  }

  const formData = new FormData();

  formData.append("idType", idType);
  formData.append("emergencyPhone", emergencyPhone);
  formData.append("guideId", guideId);

  formData.append("idFront", {
    uri: idFront.uri,
    name: "idFront.jpg",
    type: "image/jpeg",
  } as any);

  formData.append("idBack", {
    uri: idBack.uri,
    name: "idBack.jpg",
    type: "image/jpeg",
  } as any);

  if (certificate) {
    formData.append("certificate", {
      uri: certificate.uri,
      name: "certificate.jpg",
      type: "image/jpeg",
    } as any);
  }

  await api.post("/guides/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  router.push("/register/payout");
};




  if (error) {
    Alert.alert("Error", error);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>
        <Text style={styles.step}>Step 2 of 4</Text>
      </View>

      <Text style={styles.heading}>Verify Your Identity</Text>

      {/* Govt ID Type */}
      <Text style={styles.label}>Government ID Type</Text>
      <View style={styles.row}>
        {ID_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.option,
              idType === type && styles.optionSelected,
            ]}
            onPress={() => setIdType(type)}
          >
            <Text
              style={[
                styles.optionText,
                idType === type && styles.optionTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Upload ID */}
      <Text style={styles.label}>Upload ID</Text>
      <View style={styles.uploadRow}>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setIdFront)}
        >
          {idFront ? (
            <Image source={{ uri: idFront.uri }} style={styles.image} />
          ) : (
            <Text style={styles.uploadText}>Upload ID Front</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.uploadBox, { marginRight: 0 }]}
          onPress={() => pickImage(setIdBack)}
        >
          {idBack ? (
            <Image source={{ uri: idBack.uri }} style={styles.image} />
          ) : (
            <Text style={styles.uploadText}>Upload ID Back</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Certificate */}
      <Text style={styles.label}>Certificates (Optional)</Text>
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={() => pickImage(setCertificate)}
      >
        {certificate ? (
          <Image source={{ uri: certificate.uri }} style={styles.image} />
        ) : (
          <Text style={styles.uploadText}>Upload Certificate</Text>
        )}
      </TouchableOpacity>

      {/* Emergency Contact */}
      <Text style={styles.label}>Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Emergency phone number"
        keyboardType="number-pad"
        maxLength={10}
        value={emergencyPhone}
        onChangeText={setEmergencyPhone}
      />

      {/* Secure Note */}
      <View style={styles.secureRow}>
        <Text style={styles.lock}>🔒</Text>
        <Text style={styles.secureText}>Secure & encrypted</Text>
      </View>

      {/* Submit */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Uploading..." : "Submit for Verification"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  back: {
    fontSize: 16,
    color: '#2E7D32',
  },

  step: {
    fontSize: 14,
    color: '#388E3C',
    fontWeight: '600',
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginRight: 10,
    marginBottom: 10,
  },

  optionSelected: {
    backgroundColor: '#C8E6C9',
    borderColor: '#2E7D32',
  },

  optionText: {
    color: '#2E7D32',
  },

  optionTextSelected: {
    fontWeight: '600',
    color: '#1B5E20',
  },

  uploadRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  uploadBox: {
    flex: 1,
    height: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },

  uploadText: {
    fontSize: 13,
    color: '#558B2F',
    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginBottom: 16,
  },

  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  lock: {
    fontSize: 16,
    marginRight: 6,
  },

  secureText: {
    fontSize: 13,
    color: '#558B2F',
  },

  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 14,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
