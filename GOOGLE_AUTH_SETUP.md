# Setting up Google OAuth for Veloryc

To enable Gmail login, you need to connect your Google Cloud Project with your Supabase Project.

## Step 1: Google Cloud Console
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a **New Project** (or select an existing one).
3.  Navigate to **APIs & Services** > **OAuth consent screen**.
    *   Choose **External**.
    *   Fill in the App name (Veloryc) and your developer email.
    *   Add the `.../auth/userinfo.email` and `.../auth/userinfo.profile` scopes.
4.  Navigate to **APIs & Services** > **Credentials**.
    *   Click **+ Create Credentials** > **OAuth client ID**.
    *   Set Application type to **Web application**.
    *   Add an **Authorized redirect URI** (You'll get this from Supabase in the next step).

## Step 2: Supabase Dashboard
1.  Go to your [Supabase Project Dashboard](https://supabase.com/dashboard).
2.  Navigate to **Authentication** > **Providers** > **Google**.
3.  **Enable** the Google provider.
4.  Copy the **Redirect URL** shown in the Supabase Google settings.
5.  Go back to your Google Cloud Console and paste this URL into the **Authorized redirect URIs** section.
6.  Copy the **Client ID** and **Client Secret** from Google Cloud and paste them into the corresponding fields in Supabase.
7.  Click **Save Changes** in Supabase.

## Step 3: Test
1.  Go to your Veloryc site (localhost:3000).
2.  Click the **Profile icon** in the navbar.
3.  Click **Continue with Google**.
