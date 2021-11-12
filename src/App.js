import React from "react";
import {
	Flex,
	FormControl,
	FormLabel,
	Box,
	FormHelperText,
	Input,
	VStack,
	Button,
	Center,
	Select,
	Divider,
} from "@chakra-ui/react";
import { db } from "./firebase";

export default class App extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		address2: "",
		shirtSizes: [
			{
				id: 1,
				size: `Small`
			},
			{
				id: 2,
				size: "Medium"
			},
			{
				id: 3,
				size: "Large"
			},
			{
				id: 4,
				size: "Extra Large"
			},
			{
				id: 5,
				size: "2X Large"
			},
			{
				id: 6,
				size: "3X Large"
			},
		],
		selected: [],
		orderId: new Date().valueOf(),
		orderYear: new Date().getFullYear(),
	};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.cancelSubmit = this.cancelSubmit.bind(this);
	}
	onChange(id) {
		let selected = this.state.selected.splice(- 1);
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
			[event.target.name]: event.target.value	}
		);
	}
	handleSubmit(event) {
		event.preventDefault();
		db.collection("orders")
			.add({
				orderId: this.state.orderId,
				orderYear: this.state.orderYear,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address1: this.state.address1,
				address2: this.state.address2,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zipCode,
				phoneNumber: this.state.phoneNumber,
				selectedShirtSize: this.state.selectedShirtSize,
			})
			.catch((error) => {
				alert(error.message);
			});
			// alert(
			// 	`Please allow up 1.5 seconds for this data to be submitted. The page will refresh automatically`
			// );
			setTimeout(function () {
				window.location.reload(false);
			}, 1500);
			
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
	console.log(
		"First Name:", `${this.state.firstName} \n`,
		"Last Name:", `${this.state.lastName} \n`,
		"Address 1", `${this.state.address1} \n`,
		"Address 2", `${this.state.address2} \n`,
		"City", `${this.state.city} \n`,
		"State", `${this.state.state} \n`,
		"ZIP", `${this.state.zipCode} \n`,
		"Shirt Size", `${this.state.selectedShirtSize} \n`,
	)
	console.log("Shirt Size", this.state.selected[this.state.selected.length-1]);
		return (
			<form className="App" onSubmit={this.handleSubmit}>
				<Flex
					pt="135px"
					minHeight="100vh"
					maxHeight="100%"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					backgroundColor="#f1f1f3"
					color="gray.700"
				>
					<Center>
					<FormControl p={2}>
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
						<Box 
							p={4}
							mb={-5}
						>
						<FormLabel fontSize="xl">Name</FormLabel>
						</Box>
						<Box pl={4} pr={5} pb={1}>
							<FormHelperText
								color="gray.500"
								fontSize="md"
								textTransform="none"
								mb={3}
							>
								First Name
							</FormHelperText>
							<Input
								value={this.state.firstName}
								onChange={this.handleChange}
								color="#367882"
								mb={3}
								name="firstName"
								fontWeight="bold"
								placeholder="Laura"
								textTransform="capitalize"
								isRequired
								width="100%"
								border="1px"
								borderColor="gray.300"
								_placeholder={{ 
									color: 'gray.500', 
									fontWeight: "normal"
								}}
								_active={{
									borderColor: "#367882"
								}}
								_focus={{
									border: "2px",
									borderColor: "#367882"
								}}
							/>
							<FormHelperText
								color="gray.500"
								fontSize="md"
								textTransform="none"
								mb={3}
							>
								Last Name
							</FormHelperText>
							<Input
								name="lastName"
								value={this.state.lastName}
								onChange={this.handleChange}
								color="#367882"
								fontWeight="bold"
								mb={3}
								placeholder="Rabon"
								textTransform="capitalize"
								isRequired
								width="100%"
								border="1px"
								borderColor="gray.300"
								_placeholder={{ 
									color: 'gray.500', 
									fontWeight: "normal"
								}}
								_active={{
									borderColor: "#367882"
								}}
								_focus={{
									border: "2px",
									borderColor: "#367882"
								}}
							/>
						</Box>
						<Divider pt={2} pb={2} />
						<Box p={4}>
							<FormLabel fontSize="xl">Address</FormLabel>
							<FormHelperText
								color="gray.500"
								fontSize="md"
								textTransform="none"
								mb={-1}
							>
								Street Address
							</FormHelperText>
						</Box>
						<Box pl={4} pr={5} pb={1}>
							<Input
								name="address1"
								value={this.state.address1}
								onChange={this.handleChange}
								color="#367882"
								mb={3}
								fontWeight="bold"
								placeholder="Address 1"
								textTransform="capitalize"
								isRequired
								width="100%"
								border="1px"
								borderColor="gray.300"
								_placeholder={{ 
									color: 'gray.500', 
									fontWeight: "normal"
								}}
								_active={{
									borderColor: "#367882"
								}}
								_focus={{
									border: "2px",
									borderColor: "#367882"
								}}
							/>
							<Input
								value={this.state.address2}
								name="address2"
								onChange={this.handleChange}
								color="#367882"
								fontWeight="bold"
								mb={3}
								placeholder="Address 2"
								textTransform="capitalize"
								width="100%"
								border="1px"
								borderColor="gray.300"
								_placeholder={{ 
									color: 'gray.500', 
									fontWeight: "normal"
								}}
								_active={{
									borderColor: "#367882"
								}}
								_focus={{
									border: "2px",
									borderColor: "#367882"
								}}
							/>
							<FormHelperText
								color="gray.500"
								fontSize="md"
								textTransform="none"
								mb={3}
							>
								City
							</FormHelperText>
							<Input
								value={this.state.city}
								name="city"
								onChange={this.handleChange}
								color="#367882"
								fontWeight="bold"
								mb={3}
								placeholder="Address 2"
								textTransform="capitalize"
								isRequired
								width="100%"
								border="1px"
								borderColor="gray.300"
								_placeholder={{ 
									color: 'gray.500', 
									fontWeight: "normal"
								}}
								_active={{
									borderColor: "#367882"
								}}
								_focus={{
									border: "2px",
									borderColor: "#367882"
								}}
							/>
							<Flex mb={3}>
								<Flex 
									flexDirection="column"
									// border="2px solid red"
									width="45%"
									mr={5}
								>
									<FormHelperText
										color="gray.500"
										fontSize="md"
										textTransform="none"
										mb={3}
									>
										State
									</FormHelperText>	
									<Select
										value={this.state.state}
										name="state"
										onChange={this.handleChange} 
										placeholder="Select"
										textTransform="capitalize"
										isRequired
										width="100%"
										border="1px"
										color="#367882"
										fontWeight="bold"
										borderColor="gray.300"
										_placeholder={{ 
											color: 'gray.500', 
											fontWeight: "normal"
										}}
										_active={{
											borderColor: "#367882"
										}}
										_focus={{
											border: "2px",
											borderColor: "#367882"
										}}
									>
											<option value="AL">Alabama</option>
												<option value="AK">Alaska</option>
												<option value="AZ">Arizona</option>
												<option value="AR">Arkansas</option>
												<option value="CA">California</option>
												<option value="CO">Colorado</option>
												<option value="CT">Connecticut</option>
												<option value="DE">Delaware</option>
												<option value="DC">District Of Columbia</option>
												<option value="FL">Florida</option>
												<option value="GA">Georgia</option>
												<option value="HI">Hawaii</option>
												<option value="ID">Idaho</option>
												<option value="IL">Illinois</option>
												<option value="IN">Indiana</option>
												<option value="IA">Iowa</option>
												<option value="KS">Kansas</option>
												<option value="KY">Kentucky</option>
												<option value="LA">Louisiana</option>
												<option value="ME">Maine</option>
												<option value="MD">Maryland</option>
												<option value="MA">Massachusetts</option>
												<option value="MI">Michigan</option>
												<option value="MN">Minnesota</option>
												<option value="MS">Mississippi</option>
												<option value="MO">Missouri</option>
												<option value="MT">Montana</option>
												<option value="NE">Nebraska</option>
												<option value="NV">Nevada</option>
												<option value="NH">New Hampshire</option>
												<option value="NJ">New Jersey</option>
												<option value="NM">New Mexico</option>
												<option value="NY">New York</option>
												<option value="NC">North Carolina</option>
												<option value="ND">North Dakota</option>
												<option value="OH">Ohio</option>
												<option value="OK">Oklahoma</option>
												<option value="OR">Oregon</option>
												<option value="PA">Pennsylvania</option>
												<option value="RI">Rhode Island</option>
												<option value="SC">South Carolina</option>
												<option value="SD">South Dakota</option>
												<option value="TN">Tennessee</option>
												<option value="TX">Texas</option>
												<option value="UT">Utah</option>
												<option value="VT">Vermont</option>
												<option value="VA">Virginia</option>
												<option value="WA">Washington</option>
												<option value="WV">West Virginia</option>
												<option value="WI">Wisconsin</option>
												<option value="WY">Wyoming</option>
									</Select>
								</Flex>
								<Flex flexDirection="column"
									// border="2px solid red"
									width="45%"
								>
									<FormHelperText
										color="gray.500"
										fontSize="md"
										textTransform="none"
										mb={3}
									>
										ZIP
									</FormHelperText>
									<Input
										name="zipCode"
										value={this.state.zipCode}
										onChange={this.handleChange}
										color="#367882"
										fontWeight="bold"
										mb={3}
										placeholder="27604"
										textTransform="capitalize"
										isRequired
										width="100%"
										border="1px"
										borderColor="gray.300"
										inputprops={{
											maxLength: 5,
										}}
										_placeholder={{ 
											color: 'gray.500', 
											fontWeight: "normal"
										}}
										_active={{
											borderColor: "#367882"
										}}
										_focus={{
											border: "2px",
											borderColor: "#367882"
										}}
									/>
								</Flex>
							</Flex>
						</Box>
						<Divider pt={2} pb={2} />
						<Box p={4}>
							<FormLabel fontSize="xl">Phone Number</FormLabel>
							<FormHelperText
								color="gray.500"
								fontSize="md"
								textTransform="none"
								mb={-1}
							>
								
							</FormHelperText>
						</Box>
						<Box pl={4} pr={5} pb={1}>
							<Input
								name="phoneNumber"
								value={this.state.phoneNumber}
								onChange={this.handleChange}
								color="#367882"
								fontWeight="bold"
								mb={3}
								placeholder="919-809-5558"
								textTransform="capitalize"
								isRequired
								width="100%"
								border="1px"
								borderColor="gray.300"
								inputProps={{
									maxLength: 5,
								}}
								_placeholder={{ 
									color: 'gray.500', 
									fontWeight: "normal"
								}}
								_active={{
									borderColor: "#367882"
								}}
								_focus={{
									border: "2px",
									borderColor: "#367882"
								}}
							/>
						</Box>
						<Divider pt={5} pb={5} />
						<Box p={4}>
						<FormLabel fontSize="xl">Shirt</FormLabel>
						<FormHelperText
							color="gray.500"
							fontSize="md"
							textTransform="none"
							pr={8}
							// mb={3}
						>
							Select your size
						</FormHelperText>
						</Box>
						<Box p={4} textAlign="left">
							<Select
									value={this.state.selectedShirtSize}
									name="selectedShirtSize"
									onChange={this.handleChange} 
									placeholder="Select"
									textTransform="capitalize"
									isRequired
									width="100%"
									border="1px"
									color="#367882"
									fontWeight="bold"
									borderColor="gray.300"
									_placeholder={{ 
										color: 'gray.500', 
										fontWeight: "normal"
									}}
									_active={{
										borderColor: "#367882"
									}}
									_focus={{
										border: "2px",
										borderColor: "#367882"
									}}
								>
								{this.state.shirtSizes.map((item) => {
									return (
									<option 
										// value={this.state.selectedShirtSize}
									>
										{item.size}
									</option>

									);
								})}
							</Select>
						</Box>
					</Box>
					<Box pt={8}>
						<VStack pl={0} spacing={5} pb={10}>
						<Button
							width="100%"
							color="#871916"
							bgColor="white"
							border="2px"
							borderColor="#871916"
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
							width="100%"
							bgColor="#142a35"
							color="white"
							variant="solid"
							_hover={{
							transform: "scale(1.125)"
							}}
						>
							Submit Form
						</Button>
						</VStack>
					</Box>
					</FormControl>
					</Center>
				</Flex>
			</form>
		);
	};
};
