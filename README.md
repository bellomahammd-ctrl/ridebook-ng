# RIDEBOOK NG — Starter Frontend

A mobile-friendly HTML/CSS/JavaScript prototype for a Nigeria-focused ride-booking platform.

## Included
- Responsive landing page
- Passenger/driver signup and login modal (demo only)
- Ride route preview form (does not submit a real booking)
- Basic navigation and mobile menu
- No build tools required

## Run locally
Open `index.html` in a modern browser, or use a simple local web server.

## Publish with GitHub and Vercel
1. Create a GitHub repository named `ridebook-ng`.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the repository root.
3. Import that repository into Vercel.
4. For Framework Preset, choose **Other** if prompted. No build command is required; the output is the repository root.
5. Deploy.

## Important: prototype, not production
This is only the frontend starter. Authentication, driver verification, database storage, real ride dispatch, maps, notifications, payments, and admin permissions are not connected. Do not collect real customer information or use it for live rides until backend security and operational workflows are implemented and tested.

## Next build steps
1. Create a Supabase project.
2. Add environment-safe Supabase client configuration.
3. Design database tables and Row Level Security policies for profiles, drivers, vehicles, rides, payments, and ratings.
4. Connect signup/login to Supabase Auth.
5. Add server-side/Edge Function logic for ride requests and payment verification.
6. Integrate a maps provider and test location permissions.
7. Add admin access controls and audit logging.
