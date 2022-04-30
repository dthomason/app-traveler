type Orientation = 'landscape' | 'portrait';

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
