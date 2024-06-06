import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdCall,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import GenAi from "views/admin/genAi";
import Approval from "views/admin/approval"

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Config from "./config"

// Function to get user email
const getUserEmail = () => localStorage.getItem('loginName');

// Define email for special access
const specialEmail = Config.adminAccount;

export const generateRoutes = (userEmail) => [
  {
    name: "Data Marketplace",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
    component: NFTMarketplace,
  },
  {
    name: userEmail === specialEmail ? "Dataset promotion approval" : "Dataset promotion request",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: userEmail === specialEmail ? Approval : DataTables,
  },
  {
    name: "Gen AI chatroom",
    layout: "/admin",
    path: "/genai",
    icon: <Icon as={MdCall} width='20px' height='20px' color='inherit' />,
    component: GenAi,
    secondary: true,
  },
];


const routes = [
  {
    name: "Data Marketplace",
    layout: "/admin",
    path: "/default",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
  },
  {
    name: getUserEmail() === specialEmail ? "Dataset promotion approval" : "Dataset promotion request",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: getUserEmail() === specialEmail ? Approval : DataTables,
  },
  {
    name: "Gen AI chatroom",
    layout: "/admin",
    path: "/genai",
    icon: (
      <Icon
        as={MdCall}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: GenAi,
    secondary: true,
  },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
