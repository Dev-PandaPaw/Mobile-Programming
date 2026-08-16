export type AnnouncementCategory = 'academic' | 'event' | 'service';
export type AnnouncementPeriod = 'today' | 'thisWeek' | 'earlier';

export type Announcement = {
  id: string;
  category: AnnouncementCategory;
  period: AnnouncementPeriod;
  title: string;
  summary: string;
  publishedAt: string;
};

export type AnnouncementSection = {
  title: string;
  data: Announcement[];
};
