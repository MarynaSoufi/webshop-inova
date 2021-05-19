/**
 * A user parser to parse the incoming request
 */

 export default (request) => {
  const { profile } = request.body;

  // validate if we have an user in the body
  if (profile == null) {
    throw new Error('The user object was not set.');
  }

  // trim all the white/none characters in our string
  if (profile.firstName != null) {
    profile.firstName = profile.firstName.trim();
  }
  if (profile.lastName != null) {
    profile.lastName = profile.lastName.trim();
  }
  if (profile.mobileNumber != null) {
    profile.mobileNumber = profile.mobileNumber.trim();
  }
  if (profile.addressLine != null) {
    profile.addressLine = profile.addressLine.trim();
  }


  // return the parsed user
  return profile;
}