import React, { Component } from 'react';
import config from '../../config';
import {
  twitterPageURL,
} from '../../util/urlHelpers';
import { TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Page,
} from '../../components';

import css from './ContactPage.module.css';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadData,
  setInitialValues,
} from '../ListingPage/ListingPage.duck';
import { ListingPageComponent } from '../ListingPage/ListingPage';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { array, arrayOf, bool, func, oneOf, shape, string } from 'prop-types';
import ContactUsForm from '../../forms/ContactUsForm/ContactUsForm';
import { sendInternalEmail } from '../../util/api';

export class ContactPageComponent extends Component {

  constructor(props) {
    super(props);
    const { params } = props;
    this.state = {
      pageClassNames: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
  }



  onSubmit(values) {

    console.log(values)

    sendInternalEmail(values)
      .then(value =>
        console.log(value)
      )
    /*const { history, params, onSendEnquiry } = this.props;
    const routes = routeConfiguration();
    const listingId = new UUID(params.id);
    const { message } = values;

    onSendEnquiry(listingId, message.trim())
      .then(txId => {
        this.setState({ enquiryModalOpen: false });

        // Redirect to OrderDetailsPage
        history.push(
          createResourceLocatorString('OrderDetailsPage', routes, { id: txId.uuid }, {})
        );
      })
      .catch(() => {
        // Ignore, error handling in duck file
      });*/
  }
  // prettier-ignore
  render() {
    const {
      unitType,
      isAuthenticated,
      currentUser,
      getListing,
      getOwnListing,
      intl,
      onManageDisableScrolling,
      params: rawParams,
      location,
      scrollingDisabled,
      showListingError,
      reviews,
      fetchReviewsError,
      sendEnquiryInProgress,
      sendEnquiryError,
      timeSlots,
      fetchTimeSlotsError,
      filterConfig,
      onFetchTransactionLineItems,
      lineItems,
      fetchLineItemsInProgress,
      fetchLineItemsError,
    } = this.props;

    const { siteTwitterHandle, siteFacebookPage } = config;
    const siteTwitterPage = twitterPageURL(siteTwitterHandle);

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
            <h1 className={css.pageTitle}>
              <FormattedMessage id='ContactUsPage.pageTitle' />
            </h1>

            <ContactUsForm
              className={css.enquiryForm}
              submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
              sendEnquiryError={sendEnquiryError}
              onSubmit={this.onSubmit}
              inProgress={sendEnquiryInProgress}
            />
          </LayoutWrapperMain>

          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>;
      </Page>
    );
  }
};

ListingPageComponent.propTypes = {
  // from withRouter
  /*history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  unitType: propTypes.bookingUnitType,
  // from injectIntl
  intl: intlShape.isRequired,

  params: shape({
    id: string.isRequired,
    slug: string,
    variant: oneOf([LISTING_PAGE_DRAFT_VARIANT, LISTING_PAGE_PENDING_APPROVAL_VARIANT]),
  }).isRequired,

  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  getOwnListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,*/
  scrollingDisabled: bool.isRequired,
  /*enquiryModalOpenForListingId: string,
  showListingError: propTypes.error,
  callSetInitialValues: func.isRequired,
  reviews: arrayOf(propTypes.review),
  fetchReviewsError: propTypes.error,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  sendEnquiryInProgress: bool.isRequired,
  sendEnquiryError: propTypes.error,
  onSendEnquiry: func.isRequired,
  onInitializeCardPaymentData: func.isRequired,
  filterConfig: array,
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,*/
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    showListingError,
    reviews,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    sendEnquiryInProgress,
    sendEnquiryError,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    enquiryModalOpenForListingId,
  } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getOwnListing = id => {
    const ref = { id, type: 'ownListing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    /*isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,*/
    scrollingDisabled: isScrollingDisabled(state),
    /*enquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    sendEnquiryInProgress,
    sendEnquiryError,*/
  };
};

const mapDispatchToProps = dispatch => ({
  /*onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  callSetInitialValues: (setInitialValues, values, saveToSessionStorage) =>
    dispatch(setInitialValues(values, saveToSessionStorage)),
  onFetchTransactionLineItems: (bookingData, listingId, isOwnListing) =>
    dispatch(fetchTransactionLineItems(bookingData, listingId, isOwnListing)),
  onSendEnquiry: (listingId, message) => dispatch(sendEnquiry(listingId, message)),
  onInitializeCardPaymentData: () => dispatch(initializeCardPaymentData()),*/
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
ContactPage.loadData = loadData;

export default ContactPage;
