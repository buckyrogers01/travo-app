import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const DIFFICULTY = ['Easy', 'Moderate', 'Hard'];

export default function CreateBlueprintScreen() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [price, setPrice] = useState('');

  const handleSaveDraft = () => {
    // guide app → local save assume
    router.replace('/(tabs)/dashboard');
  };

  const handlePublish = () => {
    // guide app → mark as "under review"
    router.replace('/(tabs)/dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>
        <Text style={styles.headerTitle}>Blueprint Setup</Text>
      </View>

      {/* Title */}
      <TextInput
        style={styles.input}
        placeholder="Expedition Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Duration */}
      <TextInput
        style={styles.input}
        placeholder="Duration (in days)"
        keyboardType="number-pad"
        value={duration}
        onChangeText={setDuration}
      />

      {/* Difficulty */}
      <Text style={styles.label}>Difficulty</Text>
      <View style={styles.row}>
        {DIFFICULTY.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.option,
              difficulty === level && styles.optionSelected,
            ]}
            onPress={() => setDifficulty(level)}
          >
            <Text
              style={[
                styles.optionText,
                difficulty === level && styles.optionTextSelected,
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Price */}
      <TextInput
        style={styles.input}
        placeholder="Price (₹)"
        keyboardType="number-pad"
        value={price}
        onChangeText={setPrice}
      />

      {/* Cover Image */}
      <View style={styles.uploadBox}>
        <Text style={styles.uploadText}>Upload Cover Image</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleSaveDraft}
        >
          <Text style={styles.secondaryButtonText}>Save as Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handlePublish}
        >
          <Text style={styles.primaryButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    marginBottom: 24,
  },

  back: {
    fontSize: 16,
    color: '#2E7D32',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1B5E20',
    marginRight: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 8,
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

  row: {
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
    backgroundColor: '#FFFFFF',
  },

  optionSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },

  optionText: {
    color: '#2E7D32',
  },

  optionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  uploadBox: {
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  uploadText: {
    fontSize: 14,
    color: '#558B2F',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  secondaryButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 14,
    marginRight: 10,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
  },

  primaryButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
