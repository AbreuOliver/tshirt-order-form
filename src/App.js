import React from "react";
import {
	Flex,
	FormControl,
	FormLabel,
	Box,
	FormHelperText,
	Input,
	HStack,
	Text,
	Checkbox,
	Button,
	Center
} from "@chakra-ui/react";
import { db } from "./firebase";

export default class App extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		name: "",
		FridayTimes: [
		{
			id: 1,
			time: "03:00 PM - 04:00 PM"
		},
		{
			id: 2,
			time: "04:00 PM - 05:00 PM"
		},
		{
			id: 3,
			time: "05:00 PM - 06:25 PM"
		},
		{
			id: 4,
			time: "08:30 PM - 09:30 PM"
		}
		],
		SaturdayTimes: [
		{
			id: 5,
			time: `08:00 AM - 08:55 AM`
		},
		{
			id: 6,
			time: "10:20 AM - 11:05 AM"
		},
		{
			id: 7,
			time: "12:00 PM - 12:45 PM"
		},
		{
			id: 8,
			time: "12:45 PM - 01:30 PM"
		},
		{
			id: 9,
			time: "03:25 PM - 04:30 PM"
		}
		],
		selected: []
	};
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.cancelSubmit = this.cancelSubmit.bind(this);
	}
	onChange(id) {
	let selected = this.state.selected;
	let find = selected.indexOf(id);

	if (find > -1) {
		selected.splice(find, 1);
	} else {
		selected.push(id);
	}
	selected.sort((a, b) => a.id - b.id);
	this.setState({ selected });
	}
	handleChange(event) {
	this.setState({
		name: event.target.value,
		selected: this.state.selected
	});
	}
	handleSubmit(event) {
		event.preventDefault();
		db.collection("volunteers")
			.add({
				name: this.state.name,
				availableTimeSlots: this.state.selected
			})
			.catch((error) => {
				alert(error.message);
			});
			setTimeout(function () {
				window.location.reload(false);
			}, 1500);
			alert(
				`Thank you for your willingness to serve during ${
				this.state.selected.length
				} time slot(s)!`
			);
	}

	cancelSubmit(event) {
	event.preventDefault();
	this.setState({
		name: "",
		selected: ""
	});
	window.location.reload(false);
	}
	render() {
	console.log("Name", this.state.name);
	console.log("Times", this.state.selected);
		return (
			<form className="App" onSubmit={this.handleSubmit}>
				<Flex
					pt="135px"
					minHeight="1300px"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					backgroundColor="#f1f1f3"
					color="gray.700"
				>
					<Center>
					<FormControl p={4}>
					<Box
						p={5}
						maxW="sm"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						bg="white"
						borderColor="gray.200"
						mb={9}
					>
						<Box p={4}>
						<FormLabel fontSize="2xl">Your Name</FormLabel>
						<FormHelperText
							color="gray.500"
							fontSize="md"
							textTransform="none"
							mb={3}
						>
							Please enter your first and last name
						</FormHelperText>
						</Box>
						<Box pl={4} pr={5} pb={4}>
						<Input
							value={this.state.value}
							onChange={this.handleChange}
							color="gray.500"
							placeholder="Laura Rabon"
							textTransform="capitalize"
							isRequired
							width="255px"
							border="1px"
							borderColor="gray.300"
							_hover={{
							border: "1px",
							borderColor: "gray.300"
							}}
						/>
						</Box>
					</Box>
					<Box
						p={5}
						maxW="sm"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						bg="white"
						borderColor="gray.200"
						mb={5}
					>
						<Box p={4}>
						<FormLabel fontSize="2xl">Your Availability</FormLabel>
						<FormHelperText
							color="gray.500"
							fontSize="md"
							textTransform="none"
							pr={8}
							mb={3}
						>
							Please select up to three time slots during which you are
							available to help.
						</FormHelperText>
						</Box>
						<Box p={4} textAlign="left">
						<Text mb={15} fontSize="xl" fontWeight="bold">
							Friday, November 11{" "}
						</Text>
						{this.state.FridayTimes.map((item) => {
							return (
							<Button
							key={item.id}
							textAlign="left"
							bgColor="#ecc964"
							mb={2.5}
							pl={-2}
							width="245px"
							_hover={{ transform: "scale(0.98)" }}
							>
							<Checkbox
								size="lg"
								iconColor="black"
								colorScheme="white"
								border="transparent"
								type="checkbox"
								value={this.state.selected}
								onChange={() => this.onChange(item.id)}
								selected={this.state.selected.includes(item.id)}
							>
								<Text width="130%">{item.time}</Text>
							</Checkbox>
							</Button>
							);
						})}
						<br />
						<br />
						<Text mb={15} fontSize="xl" fontWeight="bold">
							Saturday, November 12{" "}
						</Text>
						{this.state.SaturdayTimes.map((item) => {
							return (
							<Button
							key={item.id}
							textAlign="left"
							bgColor="#95b8c0"
							mb={2.5}
							pl={0}
							width="245px"
							_hover={{ transform: "scale(0.98)" }}
							>
							<Checkbox
								size="lg"
								iconColor="black"
								colorScheme="white"
								border="transparent"
								value={this.state.selected}
								_focusVisible={false}
								type="checkbox"
								onChange={() => this.onChange(item.id)}
								selected={this.state.selected.includes(item.id)}
							>
								<Text width="130%">{item.time}</Text>
							</Checkbox>
							</Button>
							);
						})}
						</Box>
					</Box>
					<FormHelperText color="gray.500" fontSize="sm" pl={8}>
						Total time slots selected: {this.state.selected.length}
					</FormHelperText>
					<Box pt={8}>
						<HStack pl={5} spacing={5} pb={10}>
						<Button
							width="45%"
							color="red.700"
							bgColor="white"
							border="1px"
							borderColor="red.700"
							variant="outline"
							onClick={this.cancelSubmit}
							_hover={{
							transform: "scale(1.125)"
							}}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							width="45%"
							bgColor="#38498d"
							color="white"
							variant="solid"
							_hover={{
							transform: "scale(1.125)"
							}}
						>
							Submit Form
						</Button>
						</HStack>
					</Box>
					</FormControl>
					</Center>
				</Flex>
			</form>
		);
	};
};
