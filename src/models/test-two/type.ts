import { Decimal } from '@prisma/client/runtime/library';
import { UserType } from '../user/type';

export interface TestTwoQuestionsType {
  id: number;
  text: string;
  position: number;
}

export interface TestTwoAnswerType {
  id: number;
  answer: boolean;
  TestTwoQuestions: TestTwoQuestionsType;
}

export interface TestTwoProcessType {
  id: number;
  complete: boolean;
  startDate: Date;
  endDate: Date | null;
  TestTwoAnswer: TestTwoAnswerType[];
  User: UserType;
}

export interface TestTwoResultType {
  id: number;
  kom: Decimal;
  komResult: number;
  org: Decimal;
  orgResult: number;
  TestTwoProcesses: TestTwoProcessType;
}
