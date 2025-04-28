import { iSupport } from "../../types/interfaces/support.interface";
import { iUser } from "../../types/interfaces/users.interface";

const singleUserData: iUser = {
  id: 2,
  email: "janet.weaver@reqres.in",
  first_name: "Janet",
  last_name: "Weaver",
  avatar: "https://reqres.in/img/faces/2-image.jpg",
};

const singleResourceData = {
  id: 2,
  name: "fuchsia rose",
  year: 2001,
  color: "#C74375",
  pantone_value: "17-2031",
};

const jsonBodySupport: iSupport = {
  url: "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
  text: "Tired of writing endless social media content? Let Content Caddy generate it for you.",
};


export { singleUserData, jsonBodySupport, singleResourceData };