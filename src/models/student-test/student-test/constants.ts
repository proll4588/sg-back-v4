import { STUDENT_TEST_VARIANT_DEF } from '../student-test-process/constants.js';

export const STUDENT_TEST_QUESTION_DEF = {
  id: true,
  title: true,
  position: true,
};

export const STUDENT_TEST_DEF = {
  id: true,
  dateStart: true,
  dateEnd: true,
  passbookNumber: true,
  studentTestProcessId: true,
  StudentTestVariant: { select: STUDENT_TEST_VARIANT_DEF },
};
