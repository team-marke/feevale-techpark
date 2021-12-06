/**
 * Icons using Fontawesome SVG icons.
 * Read more about importing icons at @link https://fontawesome.com/how-to-use/with-the-api/setup/importing-icons
 */

import { dom as faDom, library as faLibrary, config as faConfig } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronRight,
  faPhoneSquareAlt,
  faEnvelopeSquare,
  faExternalLinkSquareAlt,
  faSearch,
  faChevronDown,
  faUniversity,
  faBriefcase,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faNewspaper, faBuilding, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

(() => {
  faLibrary.add(
    faChevronRight,
    faPhoneSquareAlt,
    faEnvelopeSquare,
    faExternalLinkSquareAlt,
    faSearch,
    faChevronDown,
    faUniversity,
    faNewspaper,
    faBriefcase,
    faBuilding,
    faCalendarAlt,
    faMapMarkerAlt
  );
  faConfig.showMissingIcons = false;
  faDom.watch();
})();
