import React from 'react';
import { string, bool } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput, IconEnquiry, Button } from '../../components';
import * as validators from '../../util/validators';
import { propTypes } from '../../util/types';

import css from './ContactUsForm.module.css';

const ContactUsFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        submitButtonWrapperClassName,
        formId,
        handleSubmit,
        inProgress,
        intl,
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

          <div className={submitButtonWrapperClassName}>
            {sendEnquiryError ? (
              <p className={css.error}>
                <FormattedMessage id="EnquiryForm.sendEnquiryError" />
              </p>
            ) : null}
            <PrimaryButton
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              /*ready={submitReady}*/
            >
              <FormattedMessage id="ContactUsForm.submitButtonText" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

ContactUsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  inProgress: false,
  sendEnquiryError: null,
};

ContactUsFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  inProgress: bool,

  sendEnquiryError: propTypes.error,
  sendActionMsg: string.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ContactUsForm = compose(injectIntl)(ContactUsFormComponent);

ContactUsForm.displayName = 'ContactUsForm';

export default ContactUsForm;
