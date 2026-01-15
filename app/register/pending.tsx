import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VerificationPendingScreen() {
  useEffect(() => {
    // Guide app simulation: auto-approve after few seconds
    const timer = setTimeout(() => {
      router.replace('/register/approved');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>TRAVO</Text>

      {/* Illustration Placeholder */}
      <View style={styles.illustration}>
        <Text style={styles.illustrationText}>⏳</Text>
      </View>

      {/* Content */}
      <Text style={styles.heading}>Verification in Progress</Text>

      <Text style={styles.subtext}>
        This usually takes 24–48 hours.
      </Text>

      {/* Status Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Pending Verification</Text>
      </View>

      {/* Disabled CTA */}
      <TouchableOpacity style={styles.disabledButton} disabled>
        <Text style={styles.disabledButtonText}>
          Create Expedition Blueprint
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    position: 'absolute',
    top: 48,
    fontSize: 22,
    fontWeight: '800',
    color: '#1B5E20',
    letterSpacing: 1,
  },

  illustration: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  illustrationText: {
    fontSize: 40,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtext: {
    fontSize: 15,
    color: '#388E3C',
    marginBottom: 24,
    textAlign: 'center',
  },

  badge: {
    backgroundColor: '#FFF9C4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 32,
  },

  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F57F17',
  },

  disabledButton: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  disabledButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
