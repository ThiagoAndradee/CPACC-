// WelcomePage.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-center items-center relative">
      {/* Fundo arredondado na parte superior */}
      <View className="absolute top-0 w-full h-1/3 bg-[#A7EBFE] rounded-b-[120px]" />

      {/* Card */}
      <View className="w-full max-w-md rounded-xl shadow-lg overflow-hidden">
        <View className="flex items-center justify-center p-6">
          <Image
            source={require('./assets/logo.png')}
            style={{ width: 150, height: 150 }}
            className="mb-4"
            alt="Mascote"
          />
        </View>
        <View className="p-6">
          <Text className="text-2xl font-semibold text-center mb-2">
            CPACC Trainer
          </Text>
          <Text className="text-md text-gray-600 text-center mb-4">
            A11y directly in your pocket. Train for the CPACC exam with daily challenges.
          </Text>
        </View>

        {/* Botões */}
        <View className="p-6 flex flex-col space-y-2">
          <TouchableOpacity
            onPress={() => router.push('/practice?totalQuestions=5')}
            className="w-full py-3 rounded-lg bg-[#31CD9E] text-center"
          >
            <Text className="text-white font-semibold text-center text-lg">
              Quick (5 questions)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/practice?totalQuestions=10')}
            className="w-full py-3 rounded-lg bg-[#1DA0C4] text-center my-6"
          >
            <Text className="text-white font-semibold text-center text-lg">
              Standard (10 questions)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/practice?totalQuestions=20')}
            className="w-full py-3 rounded-lg bg-[#1D1DC4] text-center"
          >
            <Text className="text-white font-semibold text-center text-lg">
              Challenge (20 questions)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
