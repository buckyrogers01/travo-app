import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PhoneOtpScreen() {
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    // Demo purpose – assume OTP is correct
    router.push('/register/profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>

      {!otpSent ? (
        <>
          {/* Phone Input State */}
          <Text style={styles.heading}>Enter your phone number</Text>

          <TextInput
            style={styles.input}
            placeholder="10-digit mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity
            style={[
              styles.button,
              phone.length !== 10 && styles.disabledButton,
            ]}
            disabled={phone.length !== 10}
            onPress={handleSendOtp}
          >
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* OTP State */}
          <Text style={styles.heading}>Verify OTP</Text>

          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpBox}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) =>
                  handleOtpChange(value, index)
                }
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleVerify}
          >
            <Text style={styles.buttonText}>
              Verify & Continue
            </Text>
          </TouchableOpacity>
        </>
      )}
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
    marginBottom: 40,
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

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 24,
    textAlign: 'center',
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

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },

  otpBox: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    fontSize: 20,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 14,
  },

  disabledButton: {
    backgroundColor: '#A5D6A7',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
