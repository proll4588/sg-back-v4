import { UserType } from '../user/type';

export interface TestOneProcessType {
  id: number;
  complete: boolean;
  startDate: Date;
  endDate: Date | null;
  TestOneAnswer: TestOneAnswerType[];
  User: UserType;
}

export interface TestOneAnswerType {
  id: number;
  answer: number;
  TestOneQuestions: TestOneQuestionsType;
}

export interface TestOneQuestionsType {
  id: number;
  position: number;
  text: string;
}

export interface TestOneResultType {
  id: number;
  TestOneProcesses: TestOneProcessType;
  TestOneResultItem: TestOneResultItem[];
}

export interface TestOneResultItem {
  id: number;
  result: number | null;
  TestOneScale: TestOneScaleType;
  TestOneLevel: TestOneLevelType;
}

export interface TestOneScaleType {
  id: number;
  title: string;
}

export interface TestOneLevelType {
  id: number;
  title: string;
}
