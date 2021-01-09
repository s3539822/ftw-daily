import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionLocations.module.css';

import gippslandImage from './images/location_gippsland.jpg';
import blueMountainsImage from './images/location_blue_mountains.jpg';
import townsvilleImage from './images/location_townsville.jpg';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}
const LazyImage = lazyLoadWithDimensions(LocationImage);

const locationLink = (name, image, searchQuery) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.imageWrapper}>
        <div className={css.aspectWrapper}>
          <LazyImage src={image} alt={name} className={css.locationImage} />
        </div>
      </div>
      <div className={css.linkText}>
        <FormattedMessage
          id="SectionLocations.listingsInLocation"
          values={{ location: nameText }}
        />
      </div>
    </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div>
      <div className={css.locations}>
        {locationLink(
          'Gippsland',
          gippslandImage,
          'address=Gippsland%20Centre%2C%20Cunninghame%20St.%2C%20Sale%2C%20Victoria%203850%2C%20Australia&bounds=-37.5286174%2C147.23426468%2C-38.65185595%2C146.5263368&mapSearch=true'
        )}
        {locationLink(
          'Blue Mountains',
          blueMountainsImage,
          '?address=Blue%20Mountains%2C%20New%20South%20Wales%2C%20Australia&bounds=-33.683162092%2C150.491901984%2C-33.7716123495%2C150.260824992'
        )}
        {locationLink(
          'Townsville',
          townsvilleImage,
          '?address=Townsville%2C%20Queensland%2C%20Australia&bounds=-19.180276014%2C146.866364%2C-19.4133283395%2C146.644110208'
        )}
      </div>
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
