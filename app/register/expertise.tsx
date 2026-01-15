import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const EXPERTISE_LIST = [
  'Trekking',
  'Camping',
  'Cultural',
  'Local Trails',
  'Wildlife',
  'Food Tours',
];

const EXPERIENCE_YEARS = ['0–1', '1–3', '3–5', '5+'];

export default function ExpertiseScreen() {
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [tripsHosted, setTripsHosted] = useState('');

  const toggleExpertise = (item: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(item)
        ? prev.filter((e) => e !== item)
        : [...prev, item]
    );
  };

  const handleContinue = () => {
    router.push('/register/documents');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>
        <Text style={styles.step}>Step 2 of 5</Text>
      </View>

      <Text style={styles.heading}>Your Expertise</Text>

      {/* Expertise Chips */}
      <Text style={styles.label}>Select your expertise</Text>
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

      {/* Experience */}
      <Text style={styles.label}>Years of experience</Text>
      <View style={styles.dropdownRow}>
        {EXPERIENCE_YEARS.map((year) => (
          <TouchableOpacity
            key={year}
            style={[
              styles.option,
              experience === year && styles.optionSelected,
            ]}
            onPress={() => setExperience(year)}
          >
            <Text
              style={[
                styles.optionText,
                experience === year && styles.optionTextSelected,
              ]}
            >
              {year}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trips Hosted */}
      <Text style={styles.label}>Trips hosted</Text>
      <TextInput
        style={styles.input}
        placeholder="Number of trips"
        keyboardType="number-pad"
        value={tripsHosted}
        onChangeText={setTripsHosted}
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

  dropdownRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
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

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 14,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
