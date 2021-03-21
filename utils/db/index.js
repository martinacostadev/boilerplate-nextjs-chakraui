import admin from 'firebase-admin';
// Explicación de como obtener archivo https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "firebase-adminsdk-nou0c@acososcallejeros.iam.gserviceaccount.com"
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();