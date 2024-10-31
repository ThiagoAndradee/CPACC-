// ResultsPage.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ResultsPage() {
  const router = useRouter();
  const { score, totalQuestions } = useLocalSearchParams();

  const scoreValue = parseInt(score as string, 10) || 0;
  const totalQuestionsValue = parseInt(totalQuestions as string, 10) || 1; // Avoid division by zero
  const [showConfetti, setShowConfetti] = useState(true);
  const percentage = Math.round((scoreValue / totalQuestionsValue) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000); // Confetti for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f3f8', alignItems: 'center' }}>
      {/* Rounded background and logo */}
      <View
        style={{
          backgroundColor: '#A7EBFE',
          padding: 24,
          paddingTop: 96,
          width: '100%',
          alignItems: 'center',
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
        }}
      >
        <Image source={require('./assets/logo.png')} style={{ width: 140, height: 140 }} />
      </View>

      {/* Confetti */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: Dimensions.get('window').width / 2, y: -20 }}
          fadeOut
        />
      )}

      {/* Results and percentage */}
      <View style={{ alignItems: 'center', marginVertical: 16, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 8 }}>
          Gut gemacht!
        </Text>
        <Text style={{ fontSize: 18 }}>Your final score</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1D4ED8' }}>
          {scoreValue}/{totalQuestionsValue}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>{percentage}%</Text>
      </View>

      {/* Play again button */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        style={{
          marginTop: 16,
          paddingVertical: 16,
          paddingHorizontal: 32,
          backgroundColor: '#31CD9E',
          borderRadius: 8,
          width: '75%',
          maxWidth: 300,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 18 }}>Play again</Text>
      </TouchableOpacity>

      {/* Encouraging text */}
      <Text
        style={{
          marginTop: 16,
          color: '#4B5563',
          fontSize: 14,
          textAlign: 'center',
          paddingHorizontal: 16,
        }}
      >
        Small habits, big evolution. Come back tomorrow for a new challenge.
      </Text>
    </View>
  );
}
