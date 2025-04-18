import { iList } from "./list.interface";
import { iSupport } from "./support.interface";

export interface iUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface iSingleUserResponse {
  data: iUser;
  support: iSupport;
};

export interface iUsersListResponse extends iList{
  data: iUser[];
  support: iSupport;
}

