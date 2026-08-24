export type StudentStatus = "Đang học" | "Bảo lưu";

export interface Student {
  id: string;
  fullName: string;
  studentId: string;
  className: string;
  status: StudentStatus;
}

export interface StudentSection {
  title: string;
  data: Student[];
}

export const studentSections: StudentSection[] = [
  {
    title: "Công nghệ thông tin",
    data: [
      {
        id: "student-01",
        fullName: "Nguyễn Minh Anh",
        studentId: "24CNTT001",
        className: "24CNTT1",
        status: "Đang học",
      },
      {
        id: "student-02",
        fullName: "Trần Quốc Bảo",
        studentId: "24CNTT002",
        className: "24CNTT1",
        status: "Đang học",
      },
      {
        id: "student-03",
        fullName: "Lê Thu Hà",
        studentId: "23CNTT015",
        className: "23CNTT2",
        status: "Bảo lưu",
      },
      {
        id: "student-04",
        fullName: "Hoàng Văn Cường",
        studentId: "24CNTT023",
        className: "24CNTT3",
        status: "Đang học",
      },
      {
        id: "student-05",
        fullName: "Đặng Thùy Dương",
        studentId: "23CNTT088",
        className: "23CNTT1",
        status: "Đang học",
      },
    ],
  },
  {
    title: "Kinh tế",
    data: [
      {
        id: "student-06",
        fullName: "Phạm Hoàng Nam",
        studentId: "24KTE010",
        className: "24KTE1",
        status: "Đang học",
      },
      {
        id: "student-07",
        fullName: "Võ Ngọc Mai",
        studentId: "23KTE022",
        className: "23KTE2",
        status: "Đang học",
      },
      {
        id: "student-08",
        fullName: "Ngô Quang Khải",
        studentId: "24KTE045",
        className: "24KTE3",
        status: "Bảo lưu",
      },
      {
        id: "student-09",
        fullName: "Lý Mỹ Linh",
        studentId: "23KTE067",
        className: "23KTE1",
        status: "Đang học",
      },
    ],
  },
  {
    title: "Ngôn ngữ Anh",
    data: [
      {
        id: "student-10",
        fullName: "Đỗ Thanh Trúc",
        studentId: "24NNA007",
        className: "24NNA1",
        status: "Đang học",
      },
      {
        id: "student-11",
        fullName: "Bùi Gia Huy",
        studentId: "23NNA018",
        className: "23NNA2",
        status: "Bảo lưu",
      },
      {
        id: "student-12",
        fullName: "Phan Khánh Vy",
        studentId: "24NNA035",
        className: "24NNA2",
        status: "Đang học",
      },
      {
        id: "student-13",
        fullName: "Tạ Minh Khang",
        studentId: "23NNA052",
        className: "23NNA3",
        status: "Đang học",
      },
    ],
  },
  {
    title: "Thiết kế đồ họa",
    data: [
      {
        id: "student-14",
        fullName: "Trương Mỹ Duyên",
        studentId: "24TKDH005",
        className: "24TKDH1",
        status: "Đang học",
      },
      {
        id: "student-15",
        fullName: "Dương Tuấn Kiệt",
        studentId: "24TKDH019",
        className: "24TKDH1",
        status: "Đang học",
      },
      {
        id: "student-16",
        fullName: "Lâm Gia Bảo",
        studentId: "23TKDH042",
        className: "23TKDH2",
        status: "Bảo lưu",
      },
    ],
  },
  {
    title: "Quản trị kinh doanh",
    data: [
      {
        id: "student-17",
        fullName: "Cao Thái Sơn",
        studentId: "24QTKD012",
        className: "24QTKD1",
        status: "Đang học",
      },
      {
        id: "student-18",
        fullName: "Nguyễn Kiều Trang",
        studentId: "24QTKD028",
        className: "24QTKD2",
        status: "Đang học",
      },
      {
        id: "student-19",
        fullName: "Hồ Vĩnh Phát",
        studentId: "23QTKD061",
        className: "23QTKD1",
        status: "Đang học",
      },
    ],
  },
];
