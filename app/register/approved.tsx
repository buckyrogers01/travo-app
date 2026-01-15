import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VerificationApprovedScreen() {
  const handleContinue = () => {
    router.replace('/register/blueprint');
  };

  return (
    <View style={styles.container}>
      {/* Celebration */}
      <Text style={styles.celebration}>🎉</Text>

      {/* Heading */}
      <Text style={styles.heading}>
        You're a Verified Guide!
      </Text>

      {/* Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✔ Verified Guide</Text>
      </View>

      {/* Subtext */}
      <Text style={styles.subtext}>
        Start hosting experiences and earn by guiding explorers.
      </Text>

      {/* CTA */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>
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

  celebration: {
    fontSize: 56,
    marginBottom: 16,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 12,
    textAlign: 'center',
  },

  badge: {
    backgroundColor: '#C8E6C9',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginBottom: 20,
  },

  badgeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
  },

  subtext: {
    fontSize: 15,
    color: '#388E3C',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },

  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
