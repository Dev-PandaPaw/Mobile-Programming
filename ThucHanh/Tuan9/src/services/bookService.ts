// src/services/bookService.ts
import { api } from '../api/client';
import { Book } from '../types';

async function getAll(): Promise<Book[]> {
  const res = await api.get<Book[]>('/books');
  return res.data;
}

async function getById(id: number): Promise<Book> {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}

// Sách liên quan: lọc NGAY TRÊN SERVER
// category=... : cùng danh mục (so khớp chính xác)
// id_ne=... : trừ sách hiện tại (_ne = not equal)
// _limit=10 : tối đa 10 cuốn
async function getRelated(book: Book, limit = 10): Promise<Book[]> {
  const res = await api.get<Book[]>('/books', {
    params: { category: book.category, id_ne: book.id, _limit: limit },
  });
  return res.data;
}

// Phân trang danh sách sách (Thử thách nâng cao): _page + _limit
async function getPage(page = 1, limit = 6): Promise<{ data: Book[]; total: number; hasMore: boolean }> {
  const res = await api.get<Book[]>('/books', {
    params: { _page: page, _limit: limit },
  });
  const totalStr = res.headers?.get?.('x-total-count');
  const total = totalStr ? parseInt(totalStr, 10) : 20;
  const hasMore = page * limit < total;
  return { data: res.data, total, hasMore };
}

export const bookService = { getAll, getById, getRelated, getPage };
export default bookService;

