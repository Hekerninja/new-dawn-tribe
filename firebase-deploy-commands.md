# Firebase Security Rules Deployment

## Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

## Deploy All Firebase Services

```bash
firebase deploy
```

## Check Current Rules

```bash
firebase firestore:rules:list
```

## Test Rules Locally

```bash
firebase emulators:start
```

## Initialize Firebase Project (if not already done)

```bash
firebase init
```

## Login to Firebase

```bash
firebase login
```

## Set Project (replace with your project ID)

```bash
firebase use your-project-id
```

## View Deployment Status

```bash
firebase deploy:list
```

## Rollback Deployment (if needed)

```bash
firebase deploy:rollback --target your-deployment-id
```

## Important Notes:

1. Make sure you have the Firebase CLI installed: `npm install -g firebase-tools`
2. You need to be logged in to Firebase: `firebase login`
3. The project must be initialized: `firebase init`
4. You need proper permissions on the Firebase project
5. Always test rules locally before deploying to production