import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PrimaryButton } from '@/src/components/PrimaryButton';

export type CourseImage =
  | {
      type: 'local' | 'remote' | 'informative';
      source: ImageSourcePropType;
      accessibilityLabel: string;
    }
  | {
      type: 'decorative';
      source: ImageSourcePropType;
    }
  | {
      type: 'loading' | 'failed';
      source?: ImageSourcePropType;
      accessibilityLabel?: string;
    };

export type Course = {
  code: string;
  title: string;
  instructor: string;
  actionLabel: string;
  imageCaseLabel: string;
  image: CourseImage;
};

export function CourseCard({ course }: { course: Course }) {
  const [isLoading, setIsLoading] = useState(Boolean(course.image.source));
  const [hasImageError, setHasImageError] = useState(false);
  const shouldShowLoadingOnly = course.image.type === 'loading';
  const shouldShowFallback = course.image.type === 'failed' || hasImageError;
  const shouldShowImage = course.image.source && !shouldShowLoadingOnly && !shouldShowFallback;
  const isDecorative = course.image.type === 'decorative';
  const imageAccessibilityLabel =
    !isDecorative && 'accessibilityLabel' in course.image
      ? course.image.accessibilityLabel
      : undefined;

  return (
    <View style={styles.courseCard}>
      <View style={styles.imageFrame}>
        {shouldShowImage ? (
          <Image
            accessibilityElementsHidden={isDecorative}
            accessibilityLabel={imageAccessibilityLabel}
            accessible={!isDecorative}
            importantForAccessibility={isDecorative ? 'no' : 'auto'}
            onError={() => {
              setHasImageError(true);
              setIsLoading(false);
            }}
            onLoadEnd={() => setIsLoading(false)}
            onLoadStart={() => setIsLoading(true)}
            resizeMode="cover"
            source={course.image.source}
            style={styles.courseImage}
          />
        ) : null}

        {isLoading || shouldShowLoadingOnly ? <ImageLoadingSurface /> : null}
        {shouldShowFallback ? <ImageFallbackSurface /> : null}
      </View>

      <Text style={styles.imageCaseLabel}>{course.imageCaseLabel}</Text>
      <Text style={styles.courseCode}>{course.code}</Text>
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.instructor}>{course.instructor}</Text>
      <View style={styles.cardDivider} />
      <PrimaryButton label={course.actionLabel} onPress={() => undefined} style={styles.courseButton} />
    </View>
  );
}

function ImageLoadingSurface() {
  return (
    <View
      accessibilityLabel="Đang tải ảnh minh họa khóa học"
      accessibilityRole="image"
      style={[styles.imageSurface, styles.loadingSurface]}>
      <MaterialIcons color="#6B7280" name="image-search" size={34} />
      <Text style={styles.imageSurfaceText}>Đang tải ảnh...</Text>
    </View>
  );
}

function ImageFallbackSurface() {
  return (
    <View
      accessibilityLabel="Ảnh khóa học không tải được, nội dung khóa học vẫn hiển thị đầy đủ"
      accessibilityRole="image"
      style={[styles.imageSurface, styles.fallbackSurface]}>
      <MaterialIcons color="#6B7280" name="broken-image" size={36} />
      <Text style={styles.imageSurfaceText}>Không tải được ảnh</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  courseCard: {
    borderColor: '#9CA3AF',
    borderWidth: 2,
    marginBottom: 18,
    padding: 18,
  },
  imageFrame: {
    aspectRatio: 2.55,
    backgroundColor: '#F4F5F7',
    borderColor: '#D1D5DB',
    borderWidth: 2,
    overflow: 'hidden',
    width: '100%',
  },
  courseImage: {
    height: '100%',
    width: '100%',
  },
  imageSurface: {
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    gap: 8,
    height: '100%',
    justifyContent: 'center',
    left: 0,
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  loadingSurface: {
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  fallbackSurface: {
    backgroundColor: '#F3F4F6',
  },
  imageSurfaceText: {
    color: '#4B5563',
    flexShrink: 1,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    minWidth: 0,
    textAlign: 'center',
  },
  imageCaseLabel: {
    color: '#0F766E',
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginTop: 18,
    minWidth: 0,
    textTransform: 'uppercase',
  },
  courseCode: {
    color: '#6B7280',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 28,
    marginTop: 8,
  },
  courseTitle: {
    color: '#000000',
    flexShrink: 1,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
    marginTop: 8,
    minWidth: 0,
  },
  instructor: {
    color: '#4B5563',
    flexShrink: 1,
    fontSize: 22,
    lineHeight: 30,
    marginTop: 12,
    minWidth: 0,
  },
  cardDivider: {
    backgroundColor: '#D1D5DB',
    height: 1,
    marginTop: 24,
  },
  courseButton: {
    alignSelf: 'flex-end',
    marginTop: 18,
    maxWidth: '100%',
  },
});
