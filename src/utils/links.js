import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "Home",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Profile",
    path: "/profile",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "explore",
    path: "/explore",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "market place",
    path: "/marketplace",
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: "create post",
    path: "createpost",
    icon: <ImProfile />,
  },
];

export default links;
