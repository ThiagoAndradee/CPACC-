// TutorialPage.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Row = {
  case: string;
  masc: string;
  fem: string;
  neut: string;
};

export default function TutorialPage() {
  const router = useRouter();
  const { totalQuestions } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Botão de Voltar */}
        <View style={{ paddingTop: 16, paddingHorizontal: 16, backgroundColor: '#A7EBFE' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Svg width="16" height="16" viewBox="0 0 72 72" fill="none" style={{ marginRight: 4 }}>
              <Path
                d="M23.475 39H60V33H23.475L40.275 16.2L36 12L12 36L36 60L40.275 55.8L23.475 39Z"
                fill="blue"
              />
            </Svg>
            <Text style={{ color: '#1E3A8A', fontWeight: 'bold', fontSize: 16 }}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Fundo arredondado e logo */}
        <View style={{ backgroundColor: '#A7EBFE', alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingTop: 80, borderBottomLeftRadius: 120, borderBottomRightRadius: 120 }} />

        {/* Título e imagem */}
        <View style={{ alignItems: 'center', marginTop: -60, paddingHorizontal: 16 }}>
          <Image source={require('./assets/logo.png')} style={{ width: 140, height: 140 }} />
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 }}>
            A quick reminder of what the declensions in German are...
          </Text>
        </View>

        {/* Conteúdo principal */}
        <View style={{ paddingHorizontal: 16 }}>
          {/* Tabela de Artigos Definidos */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Defined articles:</Text>
            {renderTable([
              { case: 'Nominativ', masc: 'Der', fem: 'Die', neut: 'Das' },
              { case: 'Akkusativ', masc: 'Den', fem: 'Die', neut: 'Das' },
              { case: 'Dativ', masc: 'Dem', fem: 'Der', neut: 'Dem' },
              { case: 'Genitiv', masc: 'Des', fem: 'Der', neut: 'Des' },
            ])}
          </View>

          {/* Tabela de Artigos Indefinidos */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Undefined articles:</Text>
            {renderTable([
              { case: 'Nominativ', masc: 'Ein', fem: 'Eine', neut: 'Ein' },
              { case: 'Akkusativ', masc: 'Einen', fem: 'Eine', neut: 'Ein' },
              { case: 'Dativ', masc: 'Einem', fem: 'Einer', neut: 'Einem' },
              { case: 'Genitiv', masc: 'Eines', fem: 'Einer', neut: 'Eines' },
            ])}
          </View>

          {/* Botão Start */}
          <TouchableOpacity
            onPress={() => router.push(`/practice?totalQuestions=${totalQuestions || 10}`)}
            style={{ backgroundColor: '#31CD9E', paddingVertical: 16, borderRadius: 8, alignItems: 'center' }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Start</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function renderTable(rows: Row[]) {
  return (
    <View style={{ borderRadius: 8, overflow: 'hidden' }}>
      {rows.map((row, index) => (
        <View key={index} style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 8, textAlign: 'center', fontWeight: 'bold', color: 'white', backgroundColor: '#1DA0C4' }}>
            {row.case}
          </Text>
          <Text style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 8, textAlign: 'center', fontWeight: 'bold', color: 'white', backgroundColor: 'black' }}>
            {row.masc}
          </Text>
          <Text style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 8, textAlign: 'center', fontWeight: 'bold', color: 'white', backgroundColor: '#DC2626' }}>
            {row.fem}
          </Text>
          <Text style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 8, textAlign: 'center', fontWeight: 'bold', color: 'white', backgroundColor: '#F59E0B' }}>
            {row.neut}
          </Text>
        </View>
      ))}
    </View>
  );
}
