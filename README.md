# Anthony Liang's Portfolio Site

This is the CMS for my portfolio, which you can learn more from here: [https://github.com/cyanChill/portfolio](https://github.com/cyanChill/portfolio).

> For images, we utilize links to images in Firebase Storage (in the future, I may add an option for uploading images directly into TinyMCE.)

# Installation & Setup

## Environment Variables

| Variable Name     | Value                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------- |
| `MONGO_URI`       | This is the URI value to our MongoDB server.                                            |
| `NEXTAUTH_URL`    | The URL of the site this will be hosted on (required for Next-Auth for authentication). |
| `NEXTAUTH_SECRET` | Used to encrypt the JWT for NextAuth.                                                   |

## How to Run Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
