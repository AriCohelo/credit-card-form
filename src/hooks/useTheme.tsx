// useTheme.ts
import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-40px)',
};

export const useTheme = () => {
  const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          background: 'linear-gradient(to left, #b00d0d 0%, #4a0505 75%)',
          margin: 0,
          padding: 0,
        },
      },
    },
    components: {
      Input: {
        baseStyle: {
          field: {
            bg: 'yellow.500',
            borderColor: 'yellow.500', // Customize as needed
          },
        },
      },
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
                top: 1.5,
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
