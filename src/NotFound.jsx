import React from "react";
import { Helmet } from "react-helmet";

const NotFound = () => (
  <>
    <Helmet>
      <title>404 – Page Not Found | DOT & CROSS</title>
      <meta name="description" content="Sorry, the page you're looking for does not exist." />
    </Helmet>
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4">Page Not Found</p>
    </div>
  </>
);

export default NotFound;
