import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  IconSpinner,
  Page,
  NamedLink,
  Footer,
} from '../../components';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { sendMessage, setInitialValues } from './ContactPage.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { bool, func, shape, string } from 'prop-types';
import ContactUsForm from '../../forms/ContactUsForm/ContactUsForm';
import { propTypes } from '../../util/types';

import css from './ContactPage.module.css';

export class ContactPageComponent extends Component {
  constructor(props) {
    super(props);

    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  onSubmitMessage(values) {
    const { currentUser, onSendMessage } = this.props;
    values.currentUser = currentUser
    onSendMessage(values)
  }

  // prettier-ignore
  render() {
    const {
      scrollingDisabled,
      sendMessageInProgress,
      sendMessageSuccess,
      sendMessageError,
    } = this.props;

    return(
      <Page
        title={"Contact Us"}
        scrollingDisabled={scrollingDisabled}
        contentType="website"
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
            {sendMessageSuccess ? (
              <>
                <h2 className={css.pageTitle}>
                  <FormattedMessage id='ContactUsPage.messageSent' />
                </h2>

                <p className={css.pageTitle}>
                  <FormattedMessage id="ContactUsPage.returnMessage1" />
                  <NamedLink name="LandingPage">
                    <FormattedMessage id="ContactUsPage.returnMessage2" />
                  </NamedLink>
                </p>
              </>
            ) : sendMessageInProgress ? (
              <>
                <h3 className={css.pageTitle}>
                  <FormattedMessage id='ContactUsPage.inProgress' />
                </h3>
                <IconSpinner className={css.inProgress}/>
              </>
            ) : (
              <>
                <h1 className={css.pageTitle}>
                  <FormattedMessage id='ContactUsPage.pageTitle' />
                </h1>
                <ContactUsForm
                  className={css.enquiryForm}
                  sendEnquiryError={sendMessageError}
                  onSubmit={this.onSubmitMessage}
                  inProgress={sendMessageInProgress}
                />
              </>
            )}
          </LayoutWrapperMain>

          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>;
      </Page>
    );
  }
};

ContactPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  callSetInitialValues: func.isRequired,
  sendMessageInProgress: bool.isRequired,
  sendMessageSuccess: bool.isRequired,
  sendMessageError: propTypes.error,
  onSendMessage: func.isRequired,
  onFetchTransactionLineItems: func.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    sendMessageInProgress,
    sendMessageSuccess,
    sendMessageError,
  } = state.ContactPage;
  const { currentUser } = state.user;

  return {
    isAuthenticated,
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    sendMessageInProgress,
    sendMessageSuccess,
    sendMessageError,
  };
};

const mapDispatchToProps = dispatch => ({
  callSetInitialValues: (setInitialValues, values, saveToSessionStorage) =>
    dispatch(setInitialValues(values, saveToSessionStorage)),
  onSendMessage: (values) =>
    dispatch(sendMessage(values)),
});

const ContactPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ContactPageComponent);

ContactPage.setInitialValues = initialValues => setInitialValues(initialValues);

export default ContactPage;
