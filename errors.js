const { AuthenticationError } = require("apollo-server-express");

class ErrorHandler {
  is_admin(user) {
    if (user === null) {
      throw new AuthenticationError("Login First");
    }
    if (user.user_type !== "admin" && user.user_type !== "manager") {
      throw new AuthenticationError(
        "Only admins & manager have the autority to perform this action"
      );
    }
  }
  is_Manager(user) {
    if (user === null) {
      throw new AuthenticationError("Login First");
    }
    if (user.user_type !== "manager") {
      throw new AuthenticationError(
        "Only managers have the autority to perform this action"
      );
    }
  }
}
module.exports = new ErrorHandler();
