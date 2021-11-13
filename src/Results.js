import {
	Flex,
	FormLabel,
	Box,
	VStack,
	Center,
    Badge,
} from "@chakra-ui/react";
import { db } from "./firebase";
import React, { useState, useEffect } from 'react';


export default function Results() {
    const [ orders, setOrders] = useState([]);
    const fetchOrders = async() => {
        const response = db.collection('orders')
        ///////////////////////////////////////////////////////////////////////////
        db
            .collection("orders")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    orders.push(doc.data());
                });
                setOrders({
                    orders: orders
                })
            })
        ///////////////////////////////////////////////////////////////////////////
        const data = await response.get();
        data.docs.forEach( item => {
            setOrders([
                ...orders, 
                item.data()
            ])
        })
    }

    // console.log("Orders:", orders)
    const propertyNames = Object.keys(orders)
    console.log("Property Names", propertyNames);
    const propertyValues = Object.values(orders);
    // console.log("Property Values", propertyValues);
    // console.log("orders.orders", propertyValues[0]);

    let result = propertyValues.filter(function({orderId}) {
        return !this.has(orderId) && this.add(orderId);
    }, new Set)
    
    useEffect(() => {
        fetchOrders();
    }, [])

    return (

        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#f1f1f3"
            color="gray.700"
            textAlign="center"
            width="2xl"
            pl={5}
            pr={5}
        >
            <Center>
                <Box
                    width="80vw"
                    pl={5}
                    pr={5}
                    minW="580px"
                    p={5}
                    pb={7}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    bg="white"
                    borderColor="gray.200"
                    mb={9}
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"					
                >
                    <Box
                        width="80vw"
                        pl={5}
                        pr={5}
                        minW="580px" 
                        p={4}
                        mb={-5}
                    >
                        <FormLabel 
                            textAlign="center"
                            fontSize="2xl"
                            fontWeight="bold"
                        >
                            Total Orders: {result.length}
                        </FormLabel>
                    </Box>
                </Box>
            </Center>
                {/* /////////////////////////////////////////////////////////////////////////// */}

                {
                    result.map
                        ( order => {
                        return(
                            <Center>
                                <Box
                                    width="80vw"
                                    pl={5}
                                    pr={5}
                                    borderRadius="lg"
                                    overflow="hidden"
                                    bg="gray.100"
                                    border="1px"
                                    borderColor="gray.500" 
                                    mb={5}
                                    height="100%"
                                >
                                    <Box
                                        width="80vw"
                                        pl={5}
                                        pr={5}
                                        minW="580px" p="6">
                                        <Box
                                            width="80vw"
                                            pl={5}
                                            pr={5}
                                            minW="580px" display="flex" alignItems="baseline">
                                        <Badge 
                                            borderRadius="full" 
                                            px="3"
                                            backgroundColor="#192a34"
                                            color="#9bdadb"
                                        >
                                            {order.selectedShirtSize}
                                        </Badge>
                                        </Box>

                                        <Box
                                            width="80vw"
                                            pl={5}
                                            pr={5}
                                            minW="580px"
                                            mt="1"
                                            fontWeight="semibold"
                                            as="h4"
                                            lineHeight="tight"
                                            isTruncated
                                            fontSize="lg"
                                        >
                                        {order.firstName} {""} {order.lastName}
                                        </Box>
                                        <VStack p={1}>                                        
                                            <Box
                                                width="80vw"
                                                pl={5}
                                                pr={5}
                                                minW="580px" as="span" color="gray.600" fontSize="md" mb={-2}>
                                                {order.address1} {order.address2}
                                            </Box> 
                                            <Box
                                                width="80vw"
                                                pl={5}
                                                pr={5}
                                                minW="580px" as="span" color="gray.600" fontSize="md">
                                                {order.city}, {order.state} {order.zip} 
                                            </Box>
                                            <Box
                                                width="80vw"
                                                pl={5}
                                                pr={5}
                                                minW="580px" as="span" color="gray.600" fontSize="md">
                                                {order.phoneNumber} 
                                                {/* {formatPhoneNumber} */}
                                            </Box> 
                                        </VStack>
                                    </Box>
                                </Box>
                            </Center>
                        )
                        })
                }
        </Flex>
    );
}