var SwaggerPetstore = require("swagger_petstore");

var defaultClient = SwaggerPetstore.ApiClient.instance;

// Configure OAuth2 access token for authorization: petstore_auth
var petstore_auth = defaultClient.authentications["petstore_auth"];
// petstore_auth.accessToken = "special-keyx";

var api = new SwaggerPetstore.PetApi();

var body = new SwaggerPetstore.Pet(); // {Pet} Pet object that needs to be added to the store

var callback = function (error, data, response) {
  console.log("callback -> data", data);
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully.");
  }
};
api.getPetById(1, (_1, data) => {
  console.log("data", data);
  data.status = "pending";
  api.updatePet(data, callback);
});
