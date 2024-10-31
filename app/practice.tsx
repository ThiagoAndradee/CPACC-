import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Sentence = {
  frase: string;
  respostas_certas: string[];
  nominativo: string;
  caso: string;
};

const allSentences: Sentence[] = [
  { frase: "Ich kenne ___ Lehrer aus der Schule.", respostas_certas: ["den", "einen"], nominativo: "der Lehrer", caso: "Akkusativ" },
  { frase: "Das Buch ___ Schülers ist interessant.", respostas_certas: ["des"], nominativo: "der Schüler", caso: "Genitiv" },
  // Adicione mais frases aqui...
];

export default function PracticePage() {
  const router = useRouter();
  const { totalQuestions } = useLocalSearchParams();

  const total = parseInt(totalQuestions as string, 10) || 10;

  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const shuffled = allSentences.sort(() => Math.random() - 0.5).slice(0, total);
    setSentences(shuffled);
  }, [total]);

  const onComplete = (finalScore: number) => {
    router.push(`/results?score=${finalScore}&totalQuestions=${total}`);
  };

  const currentSentence = sentences[currentSentenceIndex];

  const checkAnswer = () => {
    if (!currentSentence || hasAnswered) return;

    const isCorrect = currentSentence.respostas_certas.some(
      resposta => resposta.toLowerCase() === userAnswer.trim().toLowerCase()
    );

    setFeedback({
      correct: isCorrect,
      message: isCorrect ? 'Awesome!' : 'Not really...',
    });
    setShowFeedbackPanel(true);
    setHasAnswered(true);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    const newAnsweredQuestions = answeredQuestions + 1;
    setAnsweredQuestions(newAnsweredQuestions);

    if (newAnsweredQuestions >= total) {
      onComplete(correctAnswers + (isCorrect ? 1 : 0));
    }
  };

  const nextSentence = () => {
    setShowFeedbackPanel(false);
    setShowHint(false);

    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
      setUserAnswer('');
      setFeedback(null);
      setHasAnswered(false);
    } else {
      onComplete(correctAnswers);
    }
  };

  if (!currentSentence) {
    return <Text>Loading...</Text>;
  }

  const progressPercentage = Math.round(((answeredQuestions + 1) / total) * 100);
  const [beforeBlank, afterBlank] = currentSentence.frase.split('___');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} style={{ backgroundColor: '#f5f9ff' }}>
      <View className="absolute top-0 w-full h-1/3 bg-[#A7EBFE] rounded-b-[120px]" />
      <View style={{ alignItems: 'center', paddingTop: 220, paddingBottom: 20 }}>
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

      <TouchableOpacity
          onPress={() => setShowHint(prev => !prev)}
          style={{ backgroundColor: '#FFF59D', padding: 10, borderRadius: 10, marginTop: 10 }}
        >
          <Image source={require('./assets/hint-icon.png')} style={{ width: 16, height: 16, marginRight: 10 }} />
          <Text style={{ color: '#b98e22', fontWeight: 'bold' }}>Hint</Text>
        </TouchableOpacity>


      <View
      className='mx-12'
      >

        <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#d0d0d0',
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'white'
            }}
          >

            <Text style={{ fontSize: 20, fontWeight: '600' }}>{beforeBlank}</Text>
            <TextInput
              placeholder="der, die, das..."
              value={userAnswer}
              onChangeText={setUserAnswer}
              style={{
                marginHorizontal: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 20,
                textAlign: 'center',
                borderColor: '#A6E9FC',
                borderWidth: 1,
                borderRadius: 5,
                minWidth: 80,
              }}
              editable={!hasAnswered}
            />
            <Text style={{ fontSize: 20, fontWeight: '600' }}>{afterBlank}</Text>
        </View>
          
          {showHint && (
            <View 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#DBE9FE',
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
              }}
            >

          <Image source={require('./assets/showhint-icon.png')} style={{ width: 24, height: 24, marginRight: 10 }} />

              <View>
                <Text style={{ color: '#1D40B0', fontWeight: 'bold' }}>
                  Fall: <Text style={{ fontWeight: 'normal' }}>{currentSentence.caso}</Text>
                </Text>
                <Text style={{ color: '#1D40B0', fontWeight: 'bold' }}>
                  Nominativ: <Text style={{ fontWeight: 'normal' }}>{currentSentence.nominativo}</Text>
                </Text>
              </View>
            </View>
          )}

      </View>

        <TouchableOpacity
          onPress={hasAnswered ? nextSentence : checkAnswer}
          style={{ backgroundColor: '#31CD9E', padding: 15, borderRadius: 10, marginTop: 20 }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{hasAnswered ? 'Next' : 'Submit'}</Text>
        </TouchableOpacity>

        {showFeedbackPanel && feedback && (
          <View style={{
            backgroundColor: feedback.correct ? 'green' : 'red',
            padding: 10,
            borderRadius: 10,
            marginTop: 20
          }}>
            <Text style={{ color: 'white', fontSize: 18 }}>{feedback.message}</Text>
            <Text style={{ color: 'white' }}>Richtige Antwort(en): {currentSentence.respostas_certas.join(", ")}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
