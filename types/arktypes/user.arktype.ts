// import { type as t } from 'arktype';
// import { Support } from './support.arktype';

// const BodyUserData = t({
//   id: "number",
//   email: "string.email",
//   first_name: "string.alpha",
//   last_name: "string.alpha",
//   avatar: "string.url"
// });

// const UserBody = t({
//   data: BodyUserData,
//   support: Support,
// });

// const UsersListBody = t({
//   page: "number > 0",
//   per_page: "number > 0",
//   total: "number > 0",
//   total_pages: "number > 0",
//   data: BodyUserData.array(),
//   support: Support,
// });

// export type UserBodyType = typeof UserBody["infer"];
// export type UsersListBodyType = typeof UsersListBody["infer"];