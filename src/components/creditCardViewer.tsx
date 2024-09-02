import React from 'react';
import {
  Box,
  chakra,
  shouldForwardProp,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import cardChipSilver from '../assets/card-chip-silver.png';
import mcSymbol from '../assets/mc_symbol.svg';
import { useFormContext } from 'react-hook-form';
import santander from '../assets/Santander.png';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface CreditCardViewerProps {
  isCvvFocused: boolean;
}

const CreditCardViewer: React.FC<CreditCardViewerProps> = ({
  isCvvFocused,
}) => {
  const { watch } = useFormContext();
  const { cardNumber, cardName, cardDate, cardCvv } = watch();

  return (
    <Flex justifyContent="center" p="2rem">
      <Box minWidth="404px" minHeight="254px" sx={{ perspective: '1000px' }}>
        <ChakraBox
          width="100%"
          height="100%"
          position="relative"
          sx={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isCvvFocused ? 180 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' } as any}
        >
          {/* Card Front */}
          <ChakraBox
            boxShadow="0 4px 30px 0px rgba(0, 0, 0, 0.5)"
            position="absolute"
            width="100%"
            height="100%"
            // display="flex"
            // flexDirection="column"
            // justifyContent="center"
            bg="linear-gradient(to right, #b00d0d 0%, #4a0505 75%)"
            p="1rem 2rem 1rem 2rem"
            borderRadius="19px"
            sx={{ backfaceVisibility: 'hidden' }}
          >
            <Box boxSize="210px" height="42px">
              <img src={santander} alt="logo-santander" />
              <Text
                fontSize=".5rem"
                fontFamily="'Lalezar', system-ui"
                color="#ffffff"
                letterSpacing="3px"
                ml="60px"
              >
                We need your money
              </Text>
            </Box>
            <Box boxSize="64px" height="auto" mt="3rem" mb="3rem">
              <img src={cardChipSilver} alt="chip" />
            </Box>
            <Grid templateColumns="repeat(8, 1fr)" mt="1rem">
              <GridItem
                colSpan={4}
                // borderRight="1px solid rgba(161, 161, 161, 0.75)"
                alignContent="center"
              >
                <Text
                  fontSize=".93rem"
                  color="rgba(161, 161, 161, 0.75)"
                  textAlign="right"
                  fontFamily="JetBrains Mono"
                  fontWeight="800"
                >
                  {cardNumber || '0000 0000 0000 0000'}
                </Text>
                <Text
                  fontSize=".93rem"
                  color="rgba(161, 161, 161, 0.75)"
                  textAlign="right"
                  fontFamily="JetBrains Mono"
                  fontWeight="800"
                >
                  {cardName || 'JOHN APPLESEED'}
                </Text>
              </GridItem>
              <GridItem alignContent="center">
                <Text
                  textAlign="right"
                  color="rgba(161, 161, 161, 0.75)"
                  lineHeight="1"
                  fontFamily="JetBrains Mono"
                  fontSize=".4rem"
                  mr=".5rem"
                >
                  valid
                  <br />
                  thru
                </Text>
              </GridItem>
              <GridItem alignContent="center">
                <Text
                  color="rgba(161, 161, 161, 0.75)"
                  lineHeight="1"
                  fontFamily="JetBrains Mono"
                  fontSize=".8rem"
                  fontWeight="700"
                >
                  {cardDate || 'MM/YY'}
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Box boxSize="73px" height="auto" mt="-10px" ml="20px">
                  <img src={mcSymbol} alt="mcSymbol" />
                </Box>
              </GridItem>
            </Grid>
          </ChakraBox>

          {/* Card Back */}
          <ChakraBox
            position="absolute"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="linear-gradient(to right, #b00d0d 0%, #4a0505 75%)"
            p="2rem"
            borderRadius="19px"
            sx={{ backfaceVisibility: 'hidden' }}
            animate={{ rotateY: 180 }}
          >
            <Text color="white" fontSize="1.2rem">
              {cardCvv || '123'}
            </Text>
          </ChakraBox>
        </ChakraBox>
      </Box>
    </Flex>
  );
};

export default CreditCardViewer;
