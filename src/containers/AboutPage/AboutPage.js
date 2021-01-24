import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.module.css';
import image from '../../assets/background-1440.jpg';
import { FormattedMessage } from '../../util/reactIntl';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About CampWhere',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>
            <FormattedMessage id="AboutPage.pageTitle" />
          </h1>
          <img className={css.coverImage} src={image} alt="CampWhere background." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>
                <FormattedMessage id="AboutPage.sideFact" />
              </p>
            </div>

            <div className={css.contentMain}>
              <h2>
                <FormattedMessage id="AboutPage.paraMainTitle" />
              </h2>

              <p>
                <FormattedMessage id="AboutPage.body1Text" />
              </p>

              <h3 className={css.subtitle}>
                <FormattedMessage id="AboutPage.body2Header" />
              </h3>

              <p>
                <FormattedMessage id="AboutPage.body2Text" />
                CampWhere offers a platform from to which to promote your business and manage! If you are wanting to If you're not using your
                sauna every evening, why not rent it to other people while it's free. And even if
                you are using your sauna every evening (we understand, it's so good), why not invite
                other people to join you when the sauna is already warm! A shared sauna experience
                is often a more fulfilling one.
              </p>

              <p>
                <FormattedMessage id="AboutPage.callToAction1" />

                <ExternalLink href={siteFacebookPage}>
                  <FormattedMessage id="AboutPage.callToAction2" />
                </ExternalLink>

                <FormattedMessage id="AboutPage.callToAction3" />

                <ExternalLink href={siteTwitterPage}>
                  <FormattedMessage id="AboutPage.callToAction4" />
                </ExternalLink>.
              </p>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
