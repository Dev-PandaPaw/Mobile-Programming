import { Course } from './CourseCard';

const baseCourse = {
  code: 'CS-301',
  title: 'Lập trình ứng dụng di động đa nền tảng với React Native và TypeScript',
  instructor: 'Giảng viên phụ trách: Prof. Alan Turing và nhóm trợ giảng thực hành',
  actionLabel: 'Mở không gian học tập của môn học',
};

export const courseImageCases: Course[] = [
  {
    ...baseCourse,
    code: 'CS-301A',
    imageCaseLabel: 'Case 1 - Local image',
    image: {
      type: 'local',
      source: require('@/assets/images/chapter2.jpg'),
      accessibilityLabel: 'Sinh viên đang học lập trình di động trong SmartCampus',
    },
  },
  {
    ...baseCourse,
    code: 'CS-301B',
    imageCaseLabel: 'Case 2 - Remote image',
    image: {
      type: 'remote',
      source: {
        uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      },
      accessibilityLabel: 'Laptop hiển thị nội dung học trực tuyến',
    },
  },
  {
    ...baseCourse,
    code: 'CS-301C',
    imageCaseLabel: 'Case 3 - Loading placeholder',
    image: {
      type: 'loading',
    },
  },
  {
    ...baseCourse,
    code: 'CS-301D',
    imageCaseLabel: 'Case 4 - Failed image fallback',
    image: {
      type: 'failed',
      source: {
        uri: 'https://example.invalid/smart-campus-course-image.jpg',
      },
      accessibilityLabel: 'Ảnh khóa học bị lỗi tải',
    },
  },
  {
    ...baseCourse,
    code: 'CS-301E',
    imageCaseLabel: 'Case 5 - Informative image',
    image: {
      type: 'informative',
      source: require('@/assets/images/chapter2.jpg'),
      accessibilityLabel: 'Ảnh bìa cho khóa học Mobile Programming',
    },
  },
  {
    ...baseCourse,
    code: 'CS-301F',
    imageCaseLabel: 'Case 6 - Decorative image',
    image: {
      type: 'decorative',
      source: require('@/assets/images/chapter2.jpg'),
    },
  },
];
