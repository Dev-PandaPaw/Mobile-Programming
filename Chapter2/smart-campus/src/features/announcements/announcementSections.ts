import { Announcement, AnnouncementPeriod, AnnouncementSection } from './types';

const sectionOrder: { period: AnnouncementPeriod; title: string }[] = [
  { period: 'today', title: 'Today' },
  { period: 'thisWeek', title: 'This Week' },
  { period: 'earlier', title: 'Earlier' },
];

export function createAnnouncementSections(items: Announcement[]): AnnouncementSection[] {
  return sectionOrder.map(({ period, title }) => ({
    title,
    data: items.filter((item) => item.period === period),
  }));
}
