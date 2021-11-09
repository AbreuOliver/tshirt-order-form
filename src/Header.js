import React from "react";
import { Flex, Center, Text } from "@chakra-ui/react";

const Header = () => {
    return (
        <Flex color="gray.800">
        <Center
            bg="white"
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
            <Text fontSize="3xl" color="black.600">
            Ladies Retreat 2021
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="black.400">
            Volunteer Registration
            </Text>
        </Center>
        </Flex>
    );
};

export default Header;
