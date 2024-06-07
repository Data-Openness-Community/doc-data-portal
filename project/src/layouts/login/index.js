import { useState } from "react";
import { Route, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    FormErrorMessage,
    InputRightElement,
    useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Config from "config";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState(""); // State for email error message
    const history = useHistory();
    const toast = useToast(); // Using Chakra UI's toast for notifications
    const validUsers = [
        { email: Config.adminAccount, password: Config.adminPw },
        { email: Config.userAccount, password: Config.userPw }
    ];

    const validateCredentials = () => {
        return validUsers.some(user => user.email === email && user.password === password);
    };

    const handleShowClick = () => setShowPassword(!showPassword);
    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        if (email.trim() === "") {
            setEmailError("Email address is required");
            setIsSubmitting(false);
            return;
        }
        if (!validateCredentials()) {
            setEmailError("Invalid email or password.");
            setPasswordError("Invalid email or password.");
            setIsSubmitting(false);
            return;
        }
        setEmailError(""); // Clear any existing errors
        setPasswordError("");
        localStorage.setItem('loginName', email);
        // setRoutes(generateRoutes(email));
        history.push('/admin');
    };

    return (
        <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
            <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
                <Avatar bg="purple.500" />
                <Heading color="purple.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleLogin}>
                        <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                            <FormControl isInvalid={emailError}>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                                    <Input 
                                        type="email" 
                                        placeholder="email address" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={Boolean(emailError)}
                                    />
                                </InputGroup>
                                {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                                    <Input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Password" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={Boolean(passwordError)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText textAlign="right">
                                    <Link>forgot password?</Link>
                                </FormHelperText>
                            </FormControl>
                            <Button 
                                borderRadius={0} 
                                type="submit" 
                                variant="solid" 
                                colorScheme="purple" 
                                width="full" 
                                isLoading={isSubmitting}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                New to us?{" "}
                <Link color="teal.500" href="#">
                    Sign Up
                </Link>
            </Box>
        </Flex>
    );
};