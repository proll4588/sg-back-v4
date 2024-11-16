import { StudentTestVariantType } from '../student-test-process/type';

export interface StudentTestQuestionType {
  id: number;
  title: string;
  position: number;
}

export interface StudentTestOneAnswerType {
  questionId: number;
  answer: number;
}

export interface StudentTestTwoAnswerType {
  questionId: number;
  answer: boolean;
}

export interface StudentTestType {
  id: number;
  dateStart: Date;
  dateEnd: Date | null;
  passbookNumber: number;
  studentTestProcessId: number;
  StudentTestVariant: StudentTestVariantType;
}
