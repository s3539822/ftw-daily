/**
 * NumberInput renders an input field that format it's value according to number formatting rules
 * onFocus: renders given value in unformatted manner: "9999,99"
 * onBlur: formats the given input: "9 999,99 €"
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import Decimal from 'decimal.js';
import { ValidationError } from '../../components';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  isSafeNumber,
  unitDivisor,
  convertUnitToSubUnit,
  convertMoneyToNumber,
  ensureDotSeparator,
  ensureSeparator,
  truncateToSubUnitPrecision,
} from '../../util/currency';
import { propTypes } from '../../util/types';
import * as log from '../../util/log';

import css from './FieldNumberInput.module.css';

const { Money } = sdkTypes;

const allowedInputProps = allProps => {
  // Strip away props that are not passed to input element (or are overwritten)
  // eslint-disable-next-line no-unused-vars
  const { currencyConfig, defaultValue, intl, input, meta, ...inputProps } = allProps;
  return inputProps;
};

class NumberInputComponent extends Component {
  constructor(props) {
    super(props);
    const { currencyConfig, initValue, input, intl } = props;

    const initialValueIsMoney = input.value instanceof Money;

    if (initialValueIsMoney && input.value.currency !== currencyConfig.currency) {
      const e = new Error('Value currency different from marketplace currency');
      log.error(e, 'currency-input-invalid-currency', { currencyConfig, inputValue: input.value });
      throw e;
    }

    const initialValue = initialValueIsMoney ? convertMoneyToNumber(input.value) : initValue;
    const hasInitialValue = typeof initialValue === 'number' && !isNaN(initialValue);

    // We need to handle number format - some locales use dots and some commas as decimal separator
    // TODO Figure out if this could be digged from React-Intl directly somehow
    const testSubUnitFormat = intl.formatNumber('1.1', currencyConfig);
    const usesComma = testSubUnitFormat.indexOf(',') >= 0;

    try {
      // whatever is passed as a default value, will be converted to currency string
      // Unformatted value is digits + localized sub unit separator ("9,99")
      const unformattedValue = hasInitialValue
        ? truncateToSubUnitPrecision(
            ensureSeparator(initialValue.toString(), usesComma),
            1,
            usesComma
          )
        : '';

      this.state = {
        unformattedValue,
        value: unformattedValue,
        usesComma,
      };
    } catch (e) {
      log.error(e, 'currency-input-init-failed', { currencyConfig, initValue, initialValue });
      throw e;
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }

  onInputChange(event) {
    event.preventDefault();
    event.stopPropagation();
    // Update value strings on state
    const { unformattedValue } = this.updateValues(event);
    // Notify parent component about current price change
    this.props.input.onChange(unformattedValue);

    //Call parent function
    this.props.onSeatChange(event)
  }

  updateValues(event) {
    try {
      const { intl } = this.props;
      const targetValue = event.target.value.trim();
      const isEmptyString = targetValue === '';
      const valueOrZero = isEmptyString ? '0' : targetValue;

      const targetDecimalValue = isEmptyString
        ? null
        : new Decimal(ensureDotSeparator(targetValue));

      const isSafeValue =
        isEmptyString || (targetDecimalValue.isPositive() && isSafeNumber(targetDecimalValue));
      if (!isSafeValue) {
        throw new Error(`Unsafe site value: ${targetValue}`);
      }

      // truncate decimals to subunit precision: 10000.999 => 10000.99
      const truncatedValueString = truncateToSubUnitPrecision(
        valueOrZero,
        1,
        this.state.usesComma
      );
      const unformattedValue = !isEmptyString ? truncatedValueString : '';

      this.setState({
        value: unformattedValue,
        unformattedValue,
      });

      return { value: unformattedValue, unformattedValue };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      // If an error occurs while filling input field, use previous values
      // This ensures that string like '12.3r' doesn't end up to a state.
      const { unformattedValue, value } = this.state;
      return { unformattedValue, value };
    }
  }

  render() {
    const { className, defaultValue, placeholder, intl } = this.props;
    const placeholderText = placeholder || intl.formatNumber(defaultValue);
    return (
      <input
        type="text"
        className={className}
        {...allowedInputProps(this.props)}
        value={this.state.value}
        onChange={this.onInputChange}
        placeholder={placeholderText}
      />
    );
  }
}

NumberInputComponent.defaultProps = {
  className: null,
  currencyConfig: null,
  defaultValue: null,
  input: null,
  placeholder: null,
};

const { func, oneOfType, number, shape, string, object } = PropTypes;

NumberInputComponent.propTypes = {
  className: string,
  currencyConfig: propTypes.currencyConfig.isRequired,
  defaultValue: number,
  intl: intlShape.isRequired,
  input: shape({
    value: oneOfType([string, propTypes.money]),
    onBlur: func,
    onChange: func.isRequired,
    onFocus: func,
  }).isRequired,

  placeholder: string,
};

export const NumberInput = injectIntl(NumberInputComponent);

const FieldNumberInputComponent = props => {
  const { rootClassName, className, id, label, initValue, onSeatChange, labelId, input, meta, ...rest } = props;

  if (label && !id) {
    throw new Error('id required when a label is given');
  }

  const { valid, invalid, touched, error } = meta;

  // Error message and input error styles are only shown if the
  // field has been touched and the validation has failed.
  const hasError = touched && invalid && error;

  const inputClasses = classNames(css.input, {
    [css.inputSuccess]: valid,
    [css.inputError]: hasError,
  });

  const inputProps = { className: inputClasses, id, input, initValue, onSeatChange, ...rest };
  const classes = classNames(rootClassName, className);
  return (
    <div className={classes}>
      {label ? <label id={labelId} htmlFor={id}>{label}</label> : null}
      <NumberInput {...inputProps} />
      <ValidationError fieldMeta={meta} />
    </div>
  );
};

FieldNumberInputComponent.defaultProps = {
  rootClassName: null,
  className: null,
  id: null,
  label: null,
};

FieldNumberInputComponent.propTypes = {
  rootClassName: string,
  className: string,

  // Label is optional, but if it is given, an id is also required so
  // the label can reference the input in the `for` attribute
  id: string,
  label: string,
  labelId: string,

  // Generated by final-form's Field component
  input: object.isRequired,
  meta: object.isRequired,
};

const FieldNumberInput = props => {
  return <Field component={FieldNumberInputComponent} {...props} />;
};

export default FieldNumberInput;
