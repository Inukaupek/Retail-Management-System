// import { Amplify } from "aws-amplify";

// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolId: "eu-north-1_hwzArnuW1",        // from Cognito
//       userPoolClientId: "3es9ob2bcjqb4a1bn2fi5siarp",     // from App client
//       loginWith: {
//         oauth: {
//           domain: "eu-north-1hwzarnuw1.auth.eu-north-1.amazoncognito.com",
//           scopes: ["openid", "email", "phone"],
//           redirectSignIn: ["http://localhost:5173/"],
//           redirectSignOut: ["http://localhost:5173/login"],
//           responseType: "code"
//         }
//       }
//     }
//   }
// });


import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-north-1_hwzArnuW1",
      userPoolClientId: "3es9ob2bcjqb4a1bn2fi5siarp",
    },
  },
});
