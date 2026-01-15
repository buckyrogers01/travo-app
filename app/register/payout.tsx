import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

type PaymentMethod = 'BANK' | 'UPI';

export default function PayoutScreen() {
  const [method, setMethod] = useState<PaymentMethod>('BANK');

  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  const [upiId, setUpiId] = useState('');

  const handleContinue = () => {
    // Guide app: assume save success
    router.replace('/register/pending');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>
        <Text style={styles.step}>Step 4 of 5</Text>
      </View>

      <Text style={styles.heading}>Get Paid</Text>

      {/* Payment Method Toggle */}
      <Text style={styles.label}>Payment Method</Text>
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[
            styles.toggle,
            method === 'BANK' && styles.toggleActive,
          ]}
          onPress={() => setMethod('BANK')}
        >
          <Text
            style={[
              styles.toggleText,
              method === 'BANK' && styles.toggleTextActive,
            ]}
          >
            Bank Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggle,
            method === 'UPI' && styles.toggleActive,
          ]}
          onPress={() => setMethod('UPI')}
        >
          <Text
            style={[
              styles.toggleText,
              method === 'UPI' && styles.toggleTextActive,
            ]}
          >
            UPI
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bank Form */}
      {method === 'BANK' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Account Holder Name"
            value={accountName}
            onChangeText={setAccountName}
          />

          <TextInput
            style={styles.input}
            placeholder="Account Number"
            keyboardType="number-pad"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="IFSC Code"
            autoCapitalize="characters"
            value={ifsc}
            onChangeText={setIfsc}
          />
        </>
      )}

      {/* UPI Form */}
      {method === 'UPI' && (
        <TextInput
          style={styles.input}
          placeholder="UPI ID (e.g. name@upi)"
          value={upiId}
          onChangeText={setUpiId}
        />
      )}

      {/* Reassurance */}
      <Text style={styles.note}>
        🔒 Your payout details are safe and encrypted
      </Text>

      {/* Continue */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Save & Continue</Text>
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
    marginBottom: 10,
  },

  toggleRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  toggle: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  toggleActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },

  toggleText: {
    color: '#2E7D32',
    fontWeight: '500',
  },

  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginBottom: 14,
  },

  note: {
    fontSize: 13,
    color: '#558B2F',
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
