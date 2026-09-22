export interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Văn học' },
  { id: '2', name: 'Kinh tế' },
  { id: '3', name: 'Thiếu nhi' },
  { id: '4', name: 'Kỹ năng sống' },
  { id: '5', name: 'Truyện tranh' },
  { id: '6', name: 'Ngoại ngữ' },
  { id: '7', name: 'Lịch sử' },
  { id: '8', name: 'Khoa học' },
];

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: '86.000 đ',
    originalPrice: '108.000 đ',
    discount: '-20%',
    image: 'https://picsum.photos/200/300?random=1',
    description: 'Đắc Nhân Tâm của Dale Carnegie là cuốn sách nổi tiếng nhất, có tầm ảnh hưởng lớn nhất mọi thời đại về nghệ thuật đối nhân xử thế và thu phục lòng người.',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: '79.000 đ',
    originalPrice: '99.000 đ',
    discount: '-20%',
    image: 'https://picsum.photos/200/300?random=2',
    description: 'Nhà Giả Kim kể về chuyến phiêu lưu của Santiago đi tìm kho báu ở Kim Tự Tháp Ai Cập, qua đó khám phá ra kho báu đích thực của cuộc đời mình.',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: '65.000 đ',
    originalPrice: '80.000 đ',
    discount: 'Mới',
    image: 'https://picsum.photos/200/300?random=3',
    description: 'Cuốn sách truyền cảm hứng sống tích cực, tự khám phá bản thân và sống hết mình với đam mê dành cho các bạn trẻ.',
  },
  {
    id: '4',
    title: 'Cây Cam Ngọt Của Tôi',
    author: 'José Mauro',
    price: '92.000 đ',
    originalPrice: '115.000 đ',
    discount: '-20%',
    image: 'https://picsum.photos/200/300?random=4',
    description: 'Một câu chuyện cảm động và lay động hàng triệu trái tim độc giả về tình thương yêu, sự đồng cảm và nỗi buồn tuổi thơ của cậu bé Zezé.',
  },
  {
    id: '5',
    title: 'Hành Trình Về Phương Đông',
    author: 'Baird T. Spalding',
    price: '75.000 đ',
    originalPrice: '95.000 đ',
    discount: '-20%',
    image: 'https://picsum.photos/200/300?random=5',
    description: 'Một cuốn sách tâm linh kinh điển ghi lại chuyến thám hiểm của các nhà khoa học phương Tây tại Ấn Độ và Tây Tạng.',
  },
];

export const CART_ITEMS: CartItem[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    price: '86.000 đ',
    quantity: 1,
    image: 'https://picsum.photos/200/300?random=1',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim',
    price: '79.000 đ',
    quantity: 2,
    image: 'https://picsum.photos/200/300?random=2',
  },
  {
    id: '3',
    title: 'Cây Cam Ngọt Của Tôi',
    price: '92.000 đ',
    quantity: 1,
    image: 'https://picsum.photos/200/300?random=4',
  },
];
