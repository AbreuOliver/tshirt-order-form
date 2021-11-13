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

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
    }

    function formatPhoneNumber(str) {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        
        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        };
    
        return null
    };
    
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
            p={5}
            maxW="2xl"
        >
            <Center>
                <Box
                    // width="80vw"
                    minW="50vw"
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
                        // width="80vw"
                        minW="50vw"
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
                                    // width="80vw"
                                    minW="50vw"
                                    p={6}
                                    borderRadius="lg"
                                    overflow="hidden"
                                    bg="gray.100"
                                    border="1px"
                                    borderColor="gray.500" 
                                    mb={5}
                                    height="100%"
                                    // border="2px"
                                    // borderColor="orange"
                                >
                                        <Box
                                            width="50%"
                                            display="flex" 
                                            alignItems="baseline"
                                        >
                                            <Badge 
                                                borderRadius="full" 
                                                px="3"
                                                backgroundColor="#192a34"
                                                color="#9bdadb"
                                            >
                                                {order.selectedShirtSize}
                                            </Badge>
                                        </Box>

                                        <Center
                                            width="100%"
                                            fontWeight="semibold"
                                            as="h4"
                                            lineHeight="tight"
                                            isTruncated
                                            fontSize="lg"
                                            // border="2px"
                                            // borderColor="purple"
                                        >
                                        {order.firstName} {""} {order.lastName}
                                        </Center>
                                        <VStack p={1}>                                        
                                            <Box
                                                // width="80vw"
                                                minW="50vw"
                                                as="span" 
                                                color="gray.600" 
                                                fontSize="md" mb={-2}
                                            >
                                                {titleCase(`${order.address1}`.trim())}{titleCase(`${order.address2}`.trim())}
                                            </Box> 
                                            <Box
                                                // width="80vw"
                                                minW="50vw"
                                                as="span" 
                                                color="gray.600" 
                                                fontSize="md"
                                            >
                                                {order.city}, {order.state} {order.zip} 
                                            </Box>
                                            <Box
                                                // width="80vw"
                                                minW="50vw"
                                                as="span" 
                                                color="gray.600" 
                                                fontSize="md"
                                            >
                                                {formatPhoneNumber(`${order.phoneNumber}`)}
                                            </Box> 
                                        </VStack>
                                    </Box>
                            </Center>
                        )
                        })
                }
        </Flex>
    );
}