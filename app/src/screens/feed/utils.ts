type Orientation = 'landscape' | 'portrait';

export type UserImage = {
  color: string;
  description: string;
  id: string;
  likedByUser: boolean;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    location: string;
  };
  location: string;
  orientation: Orientation;
  urls: {
    full: string;
    raw: string;
    small: string;
    regular: string;
    thumb: string;
  };
  user: {
    id: string;
    username: string;
    name: string;
    profileImage: {
      small: string;
      medium: string;
      large: string;
    };
  };
};

export const getUnique = () => new Date().getTime();

export const getOrientation = (width: number, height: number): Orientation => {
  return width > height ? 'landscape' : 'portrait';
};

export const getHeight = (
  windowWidth: number,
  orientation: Orientation,
): number => {
  const portrait = windowWidth * 0.15;
  const landscape = windowWidth * 0.35;

  return orientation === 'portrait'
    ? windowWidth + portrait
    : windowWidth - landscape;
};

export const defaultLocation = {
  city: 'Oakdale',
  country: 'United States',
  position: {
    latitude: 37.7616911,
    longitude: -120.8715397,
  },
};
