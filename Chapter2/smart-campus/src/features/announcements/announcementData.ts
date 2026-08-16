import { Announcement } from './types';

export const announcements: Announcement[] = [
  {
    id: 'midterm-exam-schedule-2026-10-12',
    category: 'academic',
    title: 'Thông báo cập nhật lịch học và lịch kiểm tra giữa kỳ dành cho sinh viên',
    summary:
      'Sinh viên vui lòng kiểm tra lại phòng thi, thời gian bắt đầu và các yêu cầu chuẩn bị trước khi tham gia buổi kiểm tra.',
    publishedAt: 'Oct 12, 09:00 AM',
  },
  {
    id: 'mobile-programming-assignment-2026-10-10',
    category: 'academic',
    title: 'Bài tập Mobile Programming về xử lý bố cục khi nội dung văn bản rất dài',
    summary:
      'Nộp ảnh chụp màn hình trước và sau khi sửa lỗi, kèm phần giải thích ngắn về quyết định layout.',
    publishedAt: 'Oct 10, 02:30 PM',
  },
  {
    id: 'library-holiday-hours-2026-10-08',
    category: 'service',
    title: 'Thư viện thay đổi giờ mở cửa trong tuần lễ bảo trì hệ thống học liệu',
    summary:
      'Khu tự học tầng hai vẫn mở cửa nhưng số lượng chỗ ngồi có thể bị giới hạn vào buổi tối.',
    publishedAt: 'Oct 08, 11:15 AM',
  },
];
