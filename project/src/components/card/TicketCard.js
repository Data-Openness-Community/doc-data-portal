// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline, IoStar, IoStarOutline } from "react-icons/io5";

export default function TicketCard(props) {
  const { title, firstname, lastname, email } = props;
  const [like, setLike] = useState(false);
  const [requested, setRequested] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='row' align='end'>
              <Link
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'
                onClick={onOpen}
              >
                {title}
              </Link>
              <>
                <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.

                        Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="lightBrand" mr={3} onClick={onClose}>Close</Button>
                      {/* TODO: modify */}
                      <Link href="https://app.dremio.cloud/sonar/a340bd7d-89a1-4670-8bec-84278b1cf4ec/source/demo-catalog-01" target="_blank">
                        <Button variant="brand">Explore data</Button>
                      </Link>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                mb='7px'
                fontWeight='400'
                me='14px'>
                {firstname}{' '}{lastname}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt='5px'>
            {/* <Text fontWeight='700' fontSize='sm' color={textColorBid}>
                Rating: 
              </Text>
              <Flex direction='row'>
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rating >= 0.5 ? IoStar : IoStarOutline}
                  color='brand.500'
                />
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rating >= 1.5 ? IoStar : IoStarOutline}
                  color='brand.500'
                />
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rating >= 2.5 ? IoStar : IoStarOutline}
                  color='brand.500'
                />
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rating >= 3.5 ? IoStar : IoStarOutline}
                  color='brand.500'
                />
                <Icon
                  transition='0.2s linear'
                  w='20px'
                  h='20px'
                  as={rating >= 4.5 ? IoStar : IoStarOutline}
                  color='brand.500'
                />
              </Flex> */}
            <Button
              variant={requested ? 'lightBrand' : 'darkBrand'}
              color={requested ? 'black' : 'white'}
              fontSize='sm'
              fontWeight='500'
              borderRadius='70px'
              px='24px'
              py='5px'
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              onClick={() => setRequested(true)}
            // isDisabled={requested}
            >
              {'Approve'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}