import React from "react";

import Layout from "@zahradnik-io/gatsby-theme-novela/src/components/Layout";
import Section from "@zahradnik-io/gatsby-theme-novela/src/components/Section";
import SEO from "@zahradnik-io/gatsby-theme-novela/src/components/SEO";
import Headings from "@zahradnik-io/gatsby-theme-novela/src/components/Headings";

function NotFoundPage() {
  return (
    <Layout>
      <SEO />
      <Section>
        <div style={{ marginTop: "100px" }}>
          <Headings.h1>404: Page Not Found</Headings.h1>
        </div>
      </Section>
    </Layout>
  );
}

export default NotFoundPage;
