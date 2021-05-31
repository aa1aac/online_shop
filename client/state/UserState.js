import { makeVar } from "@apollo/client";

const UserState = makeVar({
  id: null,
  firstName: null,
  lastName: null,
  verified: null,
  cartSet: [],
  email: null,
});

export default UserState;
