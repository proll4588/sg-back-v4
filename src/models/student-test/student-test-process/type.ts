import { StudentGroupType } from '../../user/type';

export interface StudentTestProcessListItemType {
  id: number;
  title: string;
  dateStart: Date;
  dateEnd?: Date | null;
  StudentTestVariant: StudentTestVariantType;
}

export interface StudentTestVariantType {
  id: number;
  title: string;
}

export interface StudentTestProcessMembersType {
  passbookNumber: number;
  name: string;
  Group: StudentGroupType;
  StudentTest: {
    id: number;
    dateStart: Date;
    dateEnd?: Date | null;
  }[];
}

export interface StudentTestProcessListItemWithStudentTest {
  id: number;
  title: string;
  StudentTest: {
    id: number;
    dateStart: Date;
    dateEnd?: Date | null;
  }[];
}
