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

import css from './ContactPage.module.css';
import image from '../../assets/background-1440.jpg';
import { FormattedMessage } from '../../util/reactIntl';
import ContactUsForm from '../../forms/ContactUsForm/ContactUsForm';
import { EnquiryForm } from '../../forms';

const ContactPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Contact Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ContactPage',
        description: 'Contact CampWhere',
        name: 'Contact page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>
            <FormattedMessage id="ContactPage.pageTitle" />
          </h1>
          <img className={css.coverImage} src={image} alt="CampWhere background." />

          <ContactUsForm
            className={css.enquiryForm}
            submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
            listingTitle={title}
            authorDisplayName={authorDisplayName}
            sendEnquiryError={sendEnquiryError}
            onSubmit={onSubmitEnquiry}
            inProgress={sendEnquiryInProgress}
          />

          {/*<div className={css.contentWrapper}>
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
          </div>*/}
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ContactPage;
