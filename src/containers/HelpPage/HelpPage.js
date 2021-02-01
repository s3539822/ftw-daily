import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';

import css from './HelpPage.module.css';

const HelpPage = () => {
  // prettier-ignore
  return (
    <StaticPage
      title="Frequently Asked Questions"
      schema={{
        "@context": "http://schema.org",
        "@type": "WebPage",
        "description": "Help center in CampWhere marketplace.",
        "name": "Help Center"
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.mainWrapper}>
          <h1>Help Page</h1>

          {/*<div>
            <h3>Question 1?</h3>
            <p>Answer: Lorem ipsum</p>
          </div>*/}

          <div>
            <h3>Page under construction - Coming soon</h3>
          </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default HelpPage;
