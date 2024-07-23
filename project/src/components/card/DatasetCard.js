// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  GridItem ,
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
  useDisclosure,
  Tooltip
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { Player } from '@lordicon/react';
// Assets
import React, { useState, useRef } from "react";
import { IoHeart, IoHeartOutline, IoStar, IoStarOutline } from "react-icons/io5";
import DataCatalogTable from "views/admin/dataTables/components/DataCatalogTable";
import SampleDataTable from "views/admin/dataTables/components/SampleDataTable";
import Config from 'config';

export default function DatasetCard(props) {
  const [tableData, setTableData] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const [sampleColumnData, setSampleColumnData] = useState([]);
  const { owner, table_description, datasetname, rating, fields } = props;
  const [requested, setRequested] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  const [isOpen, setIsOpen] = useState(false);
  const ICON = require('assets/dataset.json');
  const onClose = () => setIsOpen(false);
  const [columnsDataCheck, setColumnsDataCheck] = useState([]);

  const playerRef = useRef(null);
  const handleMouseEnter = () => {
    playerRef.current?.playFromBeginning();
  };

  const generateColumns = (data) => {
    if (data.length === 0) return [];

    const sampleObject = data[0];
    return Object.keys(sampleObject).map(key => ({
      Header: key,
      accessor: key
    }));
  };

  const outputDataCatalog = () => {
        const columnData = [
          {
            Header: "NAME",
            accessor: "fieldPath",
          },
          {
            Header: "DESCRIPTION",
            accessor: "description",
          },
          {
            Header: "IS_SENSITIVE",
            accessor: "isSensitive",
          },
          {
            Header: "DATA_TYPE",
            accessor: "type",
          },
        ]
        setColumnsDataCheck(columnData);
        setTableData(fields.fields); // If you want to update state with this json, uncomment this line
        setIsOpen(true);


    const dataSampleUrl = `http://${Config.dataPropagateHost}/datapropagate?db=admin&view=${datasetname}&count=10`

    fetch(dataSampleUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((tableCatalog) => {
        // Function to generate columns from data keys
        const columns = generateColumns(tableCatalog);

        setSampleData(tableCatalog); // If you want to update state with this json, uncomment this line
        setSampleColumnData(columns);
      })
      .catch((error) => {
        console.error(error)
      });
  };

  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
          <div onMouseEnter={handleMouseEnter} align="center">
            <Player
              ref={playerRef}
              icon={ICON}
              size={80}
            />
          </div>
        </Box>
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
            <Tooltip label={table_description} aria-label='A tooltip'>
              {/* <Text
                color='secondaryGray.900'
                fontSize={{
                  base: "md",
                }}
                mb='7px'
                fontWeight='600'
                me='14px'>
                {datasetname}
              </Text> */}
              <Link
                color='secondaryGray.900'
                fontSize={{
                  base: "md",
                }}
                mb='7px'
                fontWeight='600'
                me='14px'
                onClick={outputDataCatalog}
              >
                {datasetname}
              </Link>
            </Tooltip>
            <Flex direction='row' align='end'>
              <>
              <Modal isOpen={isOpen} onClose={onClose} size='full' isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{datasetname}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {
                        (
                          <GridItem colStart={2} rowSpan={2}>
                            <DataCatalogTable
                              columnsData={columnsDataCheck}
                              tableData={tableData}
                              datasetname={datasetname}
                            />
                            <SampleDataTable
                              columnsData={sampleColumnData}
                              tableData={sampleData}
                              datasetname={datasetname}
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
                {"By "}{owner}
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
            <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              {rating !== "No rating" && "Rating:" || rating}
            </Text>
            {rating !== "No rating" && (
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
              </Flex>
            )
            }
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
              isDisabled={requested}>
              {requested ? 'Request submitted' : 'Request access'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}