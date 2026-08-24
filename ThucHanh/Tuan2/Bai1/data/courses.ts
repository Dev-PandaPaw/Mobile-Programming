export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  students: number;
}

export const courses: Course[] = [
  {
    id: 'course-01',
    title: 'React Native cơ bản',
    instructor: 'Nguyễn Minh Anh',
    category: 'Lập trình di động',
    students: 42,
  },
  {
    id: 'course-02',
    title: 'Thiết kế giao diện UI/UX',
    instructor: 'Trần Hoàng Nam',
    category: 'Thiết kế',
    students: 35,
  },
  {
    id: 'course-03',
    title: 'JavaScript nâng cao',
    instructor: 'Lê Thu Hà',
    category: 'Lập trình web',
    students: 58,
  },
  {
    id: 'course-04',
    title: 'Cơ sở dữ liệu',
    instructor: 'Phạm Quang Huy',
    category: 'Khoa học máy tính',
    students: 47,
  },
  {
    id: 'course-05',
    title: 'Lập trình ứng dụng với Expo',
    instructor: 'Nguyễn Minh Anh',
    category: 'Lập trình di động',
    students: 30,
  },
  {
    id: 'course-06',
    title: 'Node.js & Express REST API',
    instructor: 'Vũ Đức Trọng',
    category: 'Lập trình web',
    students: 52,
  },
  {
    id: 'course-07',
    title: 'Cấu trúc dữ liệu và giải thuật',
    instructor: 'Đặng Mai Linh',
    category: 'Khoa học máy tính',
    students: 64,
  },
  {
    id: 'course-08',
    title: 'Thiết kế Figma UI/UX nâng cao',
    instructor: 'Trần Hoàng Nam',
    category: 'Thiết kế',
    students: 28,
  },
  {
    id: 'course-09',
    title: 'Flutter toàn diện từ Zero',
    instructor: 'Hoàng Văn Thái',
    category: 'Lập trình di động',
    students: 39,
  },
  {
    id: 'course-10',
    title: 'Trí tuệ nhân tạo & Machine Learning',
    instructor: 'Phạm Quang Huy',
    category: 'Khoa học máy tính',
    students: 75,
  },
];
