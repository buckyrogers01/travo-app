import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Travo 🚀</Text>
      <Text style={styles.subtitle}>Login to explore the guide</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#A5D6A7"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#A5D6A7"
        secureTextEntry
        style={styles.input}
      />

      {/* LOGIN */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* OR */}
      <Text style={styles.orText}>OR</Text>

      {/* REGISTER */}
      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.outlineButtonText}>Register for Travo</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#388E3C',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#66BB6A',
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#2E7D32',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 28,
    textAlign: 'center',
    color: '#558B2F',
    fontSize: 13,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1B5E20',
  },
});
