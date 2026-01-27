import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const ID_TYPES = ['Aadhaar', 'Passport', 'Driving License'];

export default function VerificationDocumentsScreen() {
  const [idType, setIdType] = useState('Aadhaar');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const handleSubmit = () => {
    router.push('/register/payout');
  };

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
        <View style={styles.uploadBox}>
          <Text style={styles.uploadText}>Upload ID Front</Text>
        </View>
        <View style={styles.uploadBox}>
          <Text style={styles.uploadText}>Upload ID Back</Text>
        </View>
      </View>

      {/* Certificates */}
      <Text style={styles.label}>Certificates (Optional)</Text>
      <View style={styles.uploadBox}>
        <Text style={styles.uploadText}>Upload Certificate</Text>
      </View>

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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit for Verification</Text>
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  uploadBox: {
    flex: 1,
    height: 80,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  uploadText: {
    fontSize: 13,
    color: '#558B2F',
    textAlign: 'center',
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
