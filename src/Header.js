import React from "react";
import { Flex, Center, Text } from "@chakra-ui/react";

const Header = () => {
    return (
        <Flex color="gray.800">
            <Center
                bg="#142a35"
                w="100%"
                h="125px"
                flexDirection="column"
                display="inline-flex"
                alignItems="center"
                position="fixed"
                top={0}
                left={0}
                p={4}
                borderBottomColor="gray.100"
                borderBottomWidth="1px"
                zIndex="9"
            >
                <Text fontSize="2xl" fontWeight="bold" color="#88dcdc">
                Ladies Retreat 2021
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="white">
                Shirt Order Form
                </Text>
            </Center>
        </Flex>
    );
};

export default Header;
