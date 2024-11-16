export const STUDENT_TEST_PROCESS_LIST_ITEM_DEF = {
  id: true,
  title: true,
  dateStart: true,
  dateEnd: true,
  StudentTestVariant: { select: { id: true, title: true } },
};

export const STUDENT_TEST_VARIANT_DEF = {
  id: true,
  title: true,
};
