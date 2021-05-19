/**
 * A user parser to parse the incoming request
 */

 export default (request) => {
  const { user } = request.body;

  // validate if we have an user in the body
  if (user == null) {
    throw new Error('The user object was not set.');
  }

  // check if we have a username
  if (user.email == null || user.email.length === 0) {
    throw new Error('The User object does not contain an username.');
  }

  // trim all the white/none characters in our string
  if (user.email != null) {
    user.email = user.email.trim();
  }
  // check if we have a password
  if (user.password == null || user.password.length === 0) {
    throw new Error('The User object does not contain a password.');
  }

  // trim all the white/none characters in our string
  // if (user.password != null) {
  //   user.password = user.password.trim();
  // }


  // return the parsed user
  return user;
}