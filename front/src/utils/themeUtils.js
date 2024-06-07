// Function to retrieve a specific color from the theme
export const getColor = (colorKey) => ({ theme }) => theme.colors[colorKey];

// Function to retrieve a specific size from the theme
export const getSize = (sizeKey) => ({ theme }) => theme.size[sizeKey];

// Function to retrieve a specific font size from the theme
export const getFontSize = (fontSizeKey) => ({ theme }) => theme.fontSize[fontSizeKey];

// Function to retrieve a specific font weight from the theme
export const getFontWeight = (fontWeightKey) => ({ theme }) => theme.fontWeight[fontWeightKey];

// Function to retrieve a specific line height from the theme
export const getLineHeight = (lineHeightKey) => ({ theme }) => theme.lineHeight[lineHeightKey];

// Function to retrieve a specific spacing from the theme
export const getSpacing = (spacingKey) => ({ theme }) => theme.spacing[spacingKey];
