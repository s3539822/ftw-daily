import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.module.css';

const SectionCapacity = props => {
  const { publicData, options, typeOptions } = props;

  const capacity = publicData.capacity;
  const capacityOption = options.find(
    option => option.key === capacity
  );

  const capacityType = publicData.capacity_type;
  const capacityTypeOption = typeOptions.find(
    option => option.key === capacityType
  );

  return capacityOption ? (
    <div className={css.sectionCapacity}>
      <h2 className={css.capacityTitle}>
        <FormattedMessage id="ListingPage.capacityTitle" />
      </h2>
      <p className={css.capacity}>{capacityOption.label} {capacityTypeOption.label}</p>
    </div>
  ) : null;
};

SectionCapacity.propTypes = {
  options: array.isRequired,
  typeOptions: array.isRequired,
  publicData: shape({
    capacity: string,
  }).isRequired,
};

export default SectionCapacity;
