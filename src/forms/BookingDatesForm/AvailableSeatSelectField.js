import React from 'react';
import classNames from 'classnames'
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './BookingDatesForm.module.css';

const AvailableSeatSelectField = props => {
  const { name, id, availableSeats, intl, useMobileMargins } = props;
  const categoryLabel = intl.formatMessage({
    id: 'AvailableSeatSelectField.categoryLabel',
  });
  const categoryRequired = required(
    intl.formatMessage({
      id: 'AvailableSeatSelectField.categoryRequired',
    })
  );

  const options = () => {
    if (availableSeats === Infinity)
      return

    const list = []

    for (let i = 1; i<=availableSeats; i++) {
      list.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }

    return list
  }

  return (
    <FieldSelect
      className={classNames(css.category, {
        [css.mobileMargins]: useMobileMargins,
      })}
      name={name}
      id={id}
      label={"Number of Sites"}
      validate={categoryRequired}
    >
      <option disabled value="">
        {categoryLabel}
      </option>
      {options()}
    </FieldSelect>
  );
};

export default AvailableSeatSelectField;
