import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const LANGUAGES = ['English', 'Hindi', 'Punjabi', 'Spanish'];

export default function BasicProfileScreen() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  const handleContinue = () => {
    router.push('/register/expertise');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>
        <Text style={styles.step}>Step 1 of 5</Text>
      </View>

      <Text style={styles.heading}>About You</Text>

      {/* Profile Photo */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>Upload Photo</Text>
      </View>

      {/* Full Name */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      {/* Bio */}
      <TextInput
        style={[styles.input, styles.bio]}
        placeholder="Short bio (max 200 chars)"
        multiline
        maxLength={200}
        value={bio}
        onChangeText={setBio}
      />
      <Text style={styles.counter}>{bio.length}/200</Text>

      {/* Languages */}
      <Text style={styles.label}>Languages</Text>
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

      {/* Location */}
      <TextInput
        style={styles.input}
        placeholder="Base Location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Continue */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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

  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },

  avatarText: {
    fontSize: 12,
    color: '#2E7D32',
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginBottom: 12,
  },

  bio: {
    height: 90,
    textAlignVertical: 'top',
  },

  counter: {
    fontSize: 12,
    color: '#558B2F',
    textAlign: 'right',
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 8,
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#81C784',
    marginRight: 10,
    marginBottom: 10,
  },

  chipSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },

  chipText: {
    color: '#2E7D32',
    fontSize: 14,
  },

  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
