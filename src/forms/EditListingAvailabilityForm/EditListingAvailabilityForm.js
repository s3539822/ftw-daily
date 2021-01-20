import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldTextInput } from '../../components';

import ManageAvailabilityCalendar from './ManageAvailabilityCalendar';
import css from './EditListingAvailabilityForm.module.css';
import { ensureDayAvailabilityPlan } from '../../util/data';

export class EditListingAvailabilityFormComponent extends Component {
  render() {
    return (
      <FinalForm
        {...this.props}
        render={formRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            ready,
            handleSubmit,
            //intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            availability,
            availabilityPlan,
            listingId,
          } = formRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAvailabilityForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;

          this.state = {
            seats: 5,
            label: "dsgffds"
          }

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              <div className={css.calendarWrapper}>
                <ManageAvailabilityCalendar
                  availability={availability}
                  availabilityPlan={availabilityPlan}
                  listingId={listingId}
                  updateSeats={(seats) => {
                    console.log(seats)
                    /*this.setState();*/
                    this.state.seats = seats
                    document.getElementById(".input1").value = seats;
                    document.getElementById(".input1").innerHTML = "GEF";
                    console.log(document.getElementById(".input1").innerHTML);
                    console.log(document.getElementById(".input1").innerText);
                    this.setState({label: "fdsdsf"})
                  }}
                />
              </div>
              {/*<FieldTextInput type="text" id={`.input1`} name="input1" label="Seats:" isUncontrolled={true} defaultValue={this.state.seats}/>*/}
              <FieldTextInput type="text" id={`.input1`} name="input1" label={this.state.label} isUncontrolled={true} defaultValue={this.state.seats}/>

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingAvailabilityFormComponent.defaultProps = {
  updateError: null,
};

EditListingAvailabilityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  availability: object.isRequired,
  availabilityPlan: propTypes.availabilityPlan.isRequired,
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);
