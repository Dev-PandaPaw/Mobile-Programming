import { Announcement } from './types';

export const announcements: Announcement[] = [
  {
    id: 'today-lab-room-change-2026-10-12',
    category: 'academic',
    period: 'today',
    title: 'Cập nhật phòng thực hành Mobile Programming cho buổi học hôm nay',
    summary:
      'Lớp chuyển sang phòng Lab B204 để kiểm tra thiết bị Android emulator và kết nối mạng trước giờ thực hành.',
    publishedAt: 'Today, 08:15 AM',
  },
  {
    id: 'today-campus-network-maintenance-2026-10-12',
    category: 'service',
    period: 'today',
    title: 'Bảo trì Wi-Fi khu giảng đường trong khung giờ nghỉ trưa',
    summary:
      'Sinh viên nên lưu bài làm trước khi rời máy và dùng mạng di động dự phòng nếu cần nộp bài gấp.',
    publishedAt: 'Today, 11:30 AM',
  },
  {
    id: 'this-week-midterm-exam-schedule-2026-10-12',
    category: 'academic',
    period: 'thisWeek',
    title: 'Thông báo cập nhật lịch học và lịch kiểm tra giữa kỳ dành cho sinh viên',
    summary:
      'Sinh viên vui lòng kiểm tra lại phòng thi, thời gian bắt đầu và các yêu cầu chuẩn bị trước khi tham gia buổi kiểm tra.',
    publishedAt: 'Oct 12, 09:00 AM',
  },
  {
    id: 'this-week-mobile-programming-assignment-2026-10-10',
    category: 'academic',
    period: 'thisWeek',
    title: 'Bài tập Mobile Programming về xử lý bố cục khi nội dung văn bản rất dài',
    summary:
      'Nộp ảnh chụp màn hình trước và sau khi sửa lỗi, kèm phần giải thích ngắn về quyết định layout.',
    publishedAt: 'Oct 10, 02:30 PM',
  },
  {
    id: 'earlier-library-holiday-hours-2026-10-08',
    category: 'service',
    period: 'earlier',
    title: 'Thư viện thay đổi giờ mở cửa trong tuần lễ bảo trì hệ thống học liệu',
    summary:
      'Khu tự học tầng hai vẫn mở cửa nhưng số lượng chỗ ngồi có thể bị giới hạn vào buổi tối.',
    publishedAt: 'Oct 08, 11:15 AM',
  },
  {
    id: 'earlier-campus-career-talk-2026-10-05',
    category: 'event',
    period: 'earlier',
    title: 'Buổi chia sẻ định hướng nghề nghiệp cho sinh viên công nghệ thông tin',
    summary:
      'Khoa mời cựu sinh viên đang làm mobile engineer chia sẻ kinh nghiệm chuẩn bị portfolio và phỏng vấn.',
    publishedAt: 'Oct 05, 03:00 PM',
  },
];
