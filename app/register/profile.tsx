import { router } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { submitGuideProfile } from '../store/slices/guideSlice';

const LANGUAGES = ['English', 'Hindi', 'Punjabi', 'Spanish'];

export default function BasicProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.guide
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const EXPERTISE_LIST = [
    'Trekking',
    'Camping',
    'Cultural',
    'Local Trails',
    'Wildlife',
    'Food Tours',
  ];

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow gallery access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const toggleExpertise = (item: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(item)
        ? prev.filter((e) => e !== item)
        : [...prev, item]
    );
  };

  const handleContinue = async () => {
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      Alert.alert("Error", "User not found. Please login again.");
      return;
    }

    const payload = {
      name,
      email,
      bio,
      selectedLanguages,
      experienceYears: parseInt(experience),
      baseLocation: location,
      expertise: selectedExpertise,
    };

    dispatch(
      submitGuideProfile({
        guideId: Number(userId),
        data: payload,
      })
    )
      .unwrap()
      .then(() => {
        router.push("/register/documents"); // Step 2
      })
      .catch((err) => {
        Alert.alert("Error", err || "Profile submission failed");
      });
  };


  return (
  <View style={styles.screen}>
    {/* Header */}
    <ScrollView>
        <View style={styles.header}>
      <Text style={styles.back} onPress={() => router.back()}>
        ← Back
      </Text>
      <Text style={styles.step}>Step 1 of 5</Text>
    </View>

    {/* Card */}
    <View style={styles.card}>
      {/* Avatar + Title */}
      <View style={styles.profileRow}>

        <View style={styles.titleBlock}>
          <Text style={styles.heading}>About You</Text>
          <Text style={styles.subHeading}>
            Help travellers know you better
          </Text>
        </View>
      </View>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Years of experience"
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, styles.bio]}
        placeholder="Tell travellers about yourself (max 200 chars)"
        multiline
        maxLength={200}
        value={bio}
        onChangeText={setBio}
      />
      <Text style={styles.counter}>{bio.length}/200</Text>

      {/* Languages */}
      <Text style={styles.label}>Languages you speak</Text>
      <View style={styles.chipsRow}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.chip,
              selectedLanguages.includes(lang) && styles.chipSelected,
            ]}
            onPress={() => toggleLanguage(lang)}
          >
            <Text
              style={[
                styles.chipText,
                selectedLanguages.includes(lang) && styles.chipTextSelected,
              ]}
            >
              {lang}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Base location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Expertise */}
      <Text style={styles.label}>Your expertise</Text>
      <View style={styles.chipsRow}>
        {EXPERTISE_LIST.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,
              selectedExpertise.includes(item) && styles.chipSelected,
            ]}
            onPress={() => toggleExpertise(item)}
          >
            <Text
              style={[
                styles.chipText,
                selectedExpertise.includes(item) && styles.chipTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

    {error && (
      <Text style={{ color: "red", marginTop: 8 }}>
        {error}
      </Text>
    )}

    {/* Sticky Footer */}
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  </View>
);

}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3FBF6',
    paddingHorizontal: 20,
    overflow: 'scroll',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },

  back: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },

  step: {
    fontSize: 14,
    color: '#388E3C',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    height: 88,
    width: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#81C784',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF7EF',
  },

  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },

  avatarText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },

  titleBlock: {
    marginLeft: 16,
    flex: 1,
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B5E20',
  },

  subHeading: {
    fontSize: 14,
    color: '#558B2F',
    marginTop: 4,
  },

  input: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D7EBDD',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    marginBottom: 14,
  },

  bio: {
    height: 100,
    textAlignVertical: 'top',
  },

  counter: {
    fontSize: 12,
    color: '#558B2F',
    textAlign: 'right',
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 10,
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 22,
  },

  chip: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#81C784',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },

  chipSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
    transform: [{ scale: 1.03 }],
  },

  chipText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '500',
  },

  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  footer: {
    paddingVertical: 16,
  },

  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 18,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

