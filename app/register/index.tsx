import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BecomeGuideScreen() {
  return (
    <View style={styles.container}>
      
      {/* Logo */}
      <Text style={styles.logo}>TRAVO</Text>

      {/* Illustration Placeholder */}
      <View style={styles.illustrationBox}>
        <Text style={styles.illustrationText}>Illustration</Text>
      </View>

      {/* Content */}
      <Text style={styles.heading}>
        Earn by guiding explorers
      </Text>

      <View style={styles.bullets}>
        <Text style={styles.bullet}>• Verified platform</Text>
        <Text style={styles.bullet}>• Weekly payouts</Text>
        <Text style={styles.bullet}>• Host your own expeditions</Text>
      </View>

      {/* Primary CTA */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/register/phone')}
      >
        <Text style={styles.primaryButtonText}>
          Become a Guide
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 24,
    paddingTop: 48,
    justifyContent: 'space-between',
  },

  logo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B5E20',
    letterSpacing: 1,
    textAlign: 'center',
  },

  illustrationBox: {
    height: 220,
    borderRadius: 16,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },

  illustrationText: {
    color: '#2E7D32',
    fontSize: 14,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 16,
  },

  bullets: {
    marginBottom: 32,
  },

  bullet: {
    fontSize: 16,
    color: '#388E3C',
    marginVertical: 6,
    textAlign: 'center',
  },

  primaryButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 24,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
