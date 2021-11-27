import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      //@ts-expect-error
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
        /\\n/g,
        "\n"
      ),
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    // databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  });
}

export const verifyIdToken = (token: string) => {
  return firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};

export { firebaseAdmin };
