import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import questions from './questions.json'; // Importando o arquivo JSON

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function PracticePage() {
  const router = useRouter();
  const { totalQuestions } = useLocalSearchParams();

  const total = parseInt(totalQuestions as string, 10) || 10;

  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Embaralha as perguntas e seleciona o número total de perguntas
    const shuffled = questions.questions.sort(() => Math.random() - 0.5).slice(0, total);
    setQuestionsList(shuffled);
  }, [total]);

  const onComplete = (finalScore: number) => {
    router.push(`/results?score=${finalScore}&totalQuestions=${total}`);
  };

  const currentQuestion = questionsList[currentQuestionIndex];

  const handleAnswerSelection = (option: string) => {
    if (hasAnswered) return;

    setSelectedAnswer(option);
    const isCorrect = option.toLowerCase() === currentQuestion.answer.toLowerCase();

    setFeedback({
      correct: isCorrect,
      message: isCorrect ? 'Awesome!' : 'Not really...',
    });
    setHasAnswered(true);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    const newAnsweredQuestions = answeredQuestions + 1;
    setAnsweredQuestions(newAnsweredQuestions);

    // Avança para a próxima pergunta após 1 segundo
    setTimeout(() => {
      if (newAnsweredQuestions >= total) {
        onComplete(correctAnswers + (isCorrect ? 1 : 0));
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setFeedback(null);
        setHasAnswered(false);
      }
    }, 1000); // 1 segundo de delay antes de avançar
  };

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }

  const progressPercentage = Math.round(((answeredQuestions + 1) / total) * 100);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} style={{ backgroundColor: '#f5f9ff' }}>
      <View className="absolute top-0 w-full h-16 bg-[#A7EBFE] rounded-b-[120px]" />
      <View style={{ alignItems: 'center', paddingTop: 100, paddingBottom: 20 }}>
        <Image source={require('./assets/logo.png')} style={{ width: 140, height: 140 }} />

        <View
          style={{
            height: 10,
            width: '90%',
            backgroundColor: '#D0EFFF',
            borderRadius: 20,
            overflow: 'hidden',
            marginVertical: 20,
            alignSelf: 'center'
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${progressPercentage}%`,
              backgroundColor: '#A7EBFE',
              borderRadius: 20,
            }}
          />
        </View>
      </View>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        {/* Pergunta */}
        <Text style={{ fontSize: 16, fontWeight: '400', marginHorizontal:44, textAlign: 'center', marginBottom: 20 }}>
          {currentQuestion.question}
        </Text>

        {/* Opções de resposta */}
        <View style={{ width: '90%' }}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswerSelection(option)}
              style={{
                backgroundColor: selectedAnswer === option
                  ? (feedback?.correct ? '#31CD9E' : '#FF6B6B') // Verde se correto, vermelho se incorreto
                  : '#f5f9ff',
                padding: 20,
                borderRadius: 10,
                marginVertical: 10,
                borderWidth: 1,
                borderColor: selectedAnswer === option
                  ? (feedback?.correct ? '#1DA0C4' : '#FF3B3B') // Azul se correto, vermelho se incorreto
                  : '#d0d0d0',
              }}
              disabled={hasAnswered}
            >
              <Text style={{ fontSize: 18, textAlign: 'center' }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback */}
        {feedback && (
          <View style={{
            backgroundColor: feedback.correct ? '#31CD9E' : '#FF6B6B',
            padding: 10,
            borderRadius: 10,
            marginTop: 20
          }}>
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{feedback.message}</Text>
            <Text style={{ color: 'white', textAlign: 'center' }}>Correct Answer: {currentQuestion.answer}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}