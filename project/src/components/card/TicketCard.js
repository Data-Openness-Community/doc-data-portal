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
  GridItem,
  useDisclosure
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline, IoStar, IoStarOutline } from "react-icons/io5";
import Config from 'config';
import DataCatalogTable from "views/admin/dataTables/components/DataCatalogTable";


export default function TicketCard(props) {
  const [tableData, setTableData] = useState([]);
  const { title, firstname, lastname, email, id, datasetname } = props;
  const [like, setLike] = useState(false);
  const [requested, setRequested] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [columnsDataCheck, setColumnsDataCheck] = useState([]);

  function csvToJson(csvString) {
    // Split the CSV string into lines using the line break and filter out any empty lines
    const lines = csvString.split("\r\n").filter(line => line);
  
    // Extract headers from the first line
    const headers = lines[0].split(",");

    const transformedHeaders = headers.map(key => {
          return { Header: key.toUpperCase(), accessor: key };
    });

    setColumnsDataCheck(transformedHeaders);
  
    // Map the index of each header for easy access
    const nameIndex = headers.indexOf("name");
    const descIndex = headers.indexOf("description");
    const isSensitiveIndex = headers.indexOf("is_sensitive");
    const dataTypeIndex = headers.indexOf("data_type");

  
    // Iterate over each line after the header and create JSON objects
    const result = lines.slice(1).map(line => {
      const values = line.split(",");
      return {
        name: values[nameIndex],
        description: values[descIndex],
        is_sensitive: values[isSensitiveIndex],
        data_type: values[dataTypeIndex]
      };
    });
  
    return result;
  }

  const outputDataCatalog = (ticket_id) => {
    if (ticket_id === null) {
      return;
    }
    const showDataCatalogUrl = `http://${Config.manageTicketHost}/showdatacatalog?ticketId=${ticket_id}`
    fetch(showDataCatalogUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text();
      })
      .then((tableCatalog) => {
        const jsonResult = csvToJson(tableCatalog);
        setTableData(jsonResult); // If you want to update state with this json, uncomment this line
        setIsOpen(true);
        // setTitleData(selectedOption.value);
        // setShowTable(true);
      })
      .catch((error) => {
        console.error(error)
      });
  };

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
                onClick={() => outputDataCatalog(id)}
              >
                {title}
              </Link>
              <>
                <Modal isOpen={isOpen} onClose={onClose} size='full' isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    {
          (<GridItem colStart={2} rowSpan={2}>
            <DataCatalogTable
              columnsData={columnsDataCheck}
              tableData={tableData}
              datasetname = {datasetname}
              // titleData={titleData}
              // error={error}
              // setError={setError}
              // isOpen={isOpen}
              // setIsOpen={setIsOpen}
            />
          </GridItem>
          )
        }
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="lightBrand" mr={3} onClick={onClose}>Close</Button>
                      
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