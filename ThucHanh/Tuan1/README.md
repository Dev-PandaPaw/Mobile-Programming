# Thực Hành Tuần 1 - SmartCampus Profile

Ứng dụng dựng một màn hình hồ sơ sinh viên theo wireframe SmartCampus bằng React Native và Expo.

## Đã thực hiện

- Dùng `View`, `Text`, `Image`, `TextInput`, `ScrollView` để dựng giao diện.
- Tách component thành các file riêng trong `components/profile`.
- Component chính: `Header`, `Avatar`, `ProfileSummary`, `SearchField`, `StudentInfoCard`, `InfoRow`, `ActionButton`, `BottomNavigation`.
- `TextInput` có `value`, `onChangeText`, `placeholder`.
- `Image` có kích thước cố định và `resizeMode`.
- Các nút dùng `Pressable`, có trạng thái bình thường, đang nhấn và vô hiệu hóa.
- Nút `Lưu hồ sơ` tự vô hiệu hóa 3 giây sau khi nhấn để tránh spam.
- Có `accessibilityRole`, `accessibilityLabel`, `accessibilityState` cho hành động.

## Cấu trúc chính

- `app/(tabs)/index.tsx`: nối màn hình, state ô tìm kiếm và trạng thái disable nút.
- `components/profile/*`: các component giao diện đã tách riêng.

## Cách chạy

```bash
npm install
npm start
```

Chạy web:

```bash
npm run web
```
