// useTheme.ts
import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-35px)',
};

export const useTheme = () => {
  const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          backgroundColor: 'gray', // Use Chakra UI color tokens or custom hex values
          color: 'gray.800', // Optional: Set default text color
          lineHeight: 'base', // Optional: Set default line height
          margin: 0, // Reset default body margin
          padding: 0, // Reset default body padding
        },
      },
    },
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles,
                },
              },
              'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
                {
                  ...activeLabelStyles,
                },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: 'absolute',
                backgroundColor: 'transparent',
                pointerEvents: 'none',
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: 'left top',
              },
            },
          },
        },
      },
    },
  });

  return theme;
};
