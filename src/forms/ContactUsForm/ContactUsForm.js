import React from 'react';
import { string, bool } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, FieldTextInput, IconEnquiry, Button, NamedLink } from '../../components';
import * as validators from '../../util/validators';
import { propTypes } from '../../util/types';

import css from './ContactUsForm.module.css';

const ContactUsFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const onSubmit = () => {
        const { onResetMessage } = fieldRenderProps;
        onResetMessage()
      }

      const {
        rootClassName,
        className,
        formId,
        handleSubmit,
        inProgress,
        sendMessageSuccess,
        intl,
        updated,
        pristine,
        ready,
        sendEnquiryError,
      } = fieldRenderProps;

      const firstNameTitle = intl.formatMessage({
        id: 'ContactUsForm.firstNameTitle',
      });
      const firstNamePlaceholder = intl.formatMessage({
        id: 'ContactUsForm.firstNamePlaceholder',
      });
      const firstNameRequiredMessage = intl.formatMessage({
        id: 'ContactUsForm.firstNameRequired',
      });
      const firstNameRequired = validators.requiredAndNonEmptyString(firstNameRequiredMessage)

      const lastNameTitle = intl.formatMessage({
        id: 'ContactUsForm.lastNameTitle',
      });
      const lastNamePlaceholder = intl.formatMessage({
        id: 'ContactUsForm.lastNamePlaceholder',
      });
      const lastNameRequiredMessage = intl.formatMessage({
        id: 'ContactUsForm.lastNameRequired',
      });
      const lastNameRequired = validators.requiredAndNonEmptyString(lastNameRequiredMessage)

      const emailTitle = intl.formatMessage({
        id: 'ContactUsForm.emailTitle',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'ContactUsForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'ContactUsForm.emailRequired',
      });
      const emailRequired = validators.emailFormatValid(emailRequiredMessage)

      const messageTitle = intl.formatMessage({
        id: 'ContactUsForm.messageTitle',
      });
      const messagePlaceholder = intl.formatMessage({
        id: 'ContactUsForm.messagePlaceholder',
      });
      const messageRequiredMessage = intl.formatMessage({
        id: 'ContactUsForm.messageRequired',
      });
      const messageRequired = validators.requiredAndNonEmptyString(messageRequiredMessage);

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = submitInProgress;
      const submitReady = (updated && pristine) || ready;
      const submitSuccess = /*(!pristine) ? (*/sendMessageSuccess/* ? ready : false) : false;*/

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <IconEnquiry className={css.icon} />
          <FieldTextInput
            className={css.field}
            type="textarea"
            name="f_name"
            id={formId ? `${formId}.f_name` : 'f_name'}
            label={firstNameTitle}
            placeholder={firstNamePlaceholder}
            validate={firstNameRequired}
          />
          <FieldTextInput
            className={css.field}
            type="textarea"
            name="l_name"
            id={formId ? `${formId}.l_name` : 'l_name'}
            label={lastNameTitle}
            placeholder={lastNamePlaceholder}
            validate={lastNameRequired}
          />
          <FieldTextInput
            className={css.field}
            type="textarea"
            name="email"
            id={formId ? `${formId}.email` : 'email'}
            label={emailTitle}
            placeholder={emailPlaceholder}
            validate={emailRequired}
          />
          <FieldTextInput
            className={css.field}
            type="textarea"
            name="message"
            id={formId ? `${formId}.message` : 'message'}
            label={messageTitle}
            placeholder={messagePlaceholder}
            validate={messageRequired}
            rows={4}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            <FormattedMessage id="ContactUsForm.submitButtonText" />
          </Button>
          {submitSuccess ? (
            <p className={css.success}>
              <FormattedMessage id="ContactUsPage.returnMessage1" />
              <NamedLink name="LandingPage"  onClick={onSubmit}>
                <FormattedMessage id="ContactUsPage.returnMessage2"/>
              </NamedLink>
            </p>
          ) : null}
          {sendEnquiryError ? (
            <p className={css.error}>
              <FormattedMessage id="EnquiryForm.sendEnquiryError" />
            </p>
          ) : null}
        </Form>
      );
    }}
  />
);

ContactUsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
  sendEnquiryError: null,
};

ContactUsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  inProgress: bool,
  updated: bool.isRequired,
  ready: bool.isRequired,

  sendEnquiryError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ContactUsForm = compose(injectIntl)(ContactUsFormComponent);

ContactUsForm.displayName = 'ContactUsForm';

export default ContactUsForm;
