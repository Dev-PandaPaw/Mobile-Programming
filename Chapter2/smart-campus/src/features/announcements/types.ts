export type AnnouncementCategory = 'academic' | 'event' | 'service';

export type Announcement = {
  id: string;
  category: AnnouncementCategory;
  title: string;
  summary: string;
  publishedAt: string;
};
