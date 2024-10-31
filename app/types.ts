// types.ts
export type RootStackParamList = {
    WelcomePage: undefined;
    TutorialPage: undefined;
    PracticePage: { totalQuestions: number };
    ResultsPage: { score: number; totalQuestions: number };
  };
  