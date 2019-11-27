/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import 'px-moment-imports/px-moment-imports.js';

import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
var PxDatetimeBehavior = window.PxDatetimeBehavior = (window.PxDatetimeBehavior || {});

/**
 * Provides the blockPastDates and blockFutureDates properties
 *
 * @polymerBehavior PxDatetimeBehavior.BlockDates
 */
PxDatetimeBehavior.BlockDates = {
  properties: {
    /**
     * Set this attribute when you do not want to allow future dates to be selected (future dates will be disabled and unclickable).
     */
    blockFutureDates: {
      type: Boolean,
      value: false
    },
    /**
     * Set this attribute when you do not want to allow past dates to be selected (past dates will be disabled and unclickable).
     */
    blockPastDates: {
      type: Boolean,
      value: false
    }
  }
};

/**
 * For all `px-datetime` components
 * Dependencies: momentjs
 *
 * @polymerBehavior PxDatetimeBehavior.Shared
 */
PxDatetimeBehavior.Shared = [{
  properties: {
    /**
     * Moment-timezone string for using a specific timezone. See
     * http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/.
     *
     * If not provided, tries to guess the current local timezone.
     *
     * @default Px.moment.tz.guess();
     */
    timeZone: {
      type: String,
      notify: true,
      value: function() {
        return Px.moment.tz.guess();
      }
    },
     /**
      * set a default for localizing
      */
    language: {
      type: String,
      value: 'en'
    },
     /**
      * Use the key for localization if value for  language is missing. Should
      * always be true for  our components
      */
    useKeyIfMissing: {
      type: Boolean,
      value: true
    },
     /**
     * The minimum / earliest allowed date, as a a Moment object or an ISO 8601 String (dates before this will be disabled and unclickable).
     */
    minDate: {
      type: Object,
      observer: '_minDateChanged'
    },
    /**
     * The maximum / latest allowed date, as a a Moment object or an ISO 8601 String (dates after this will be disabled and unclickable).
     */
    maxDate: {
      type: Object,
      observer: '_maxDateChanged'
    }
  },
  observers: [
    '_updateMinMaxTz(timeZone)'
  ],
  _updateMinMaxTz: function() {
    if(this.timeZone !== undefined) {
      if(this.minDate && this.minDate.tz) {
        this.minDate.tz(this.timeZone);
      }
      if(this.maxDate && this.maxDate.tz) {
        this.maxDate.tz(this.timeZone);
      }
    }
  },
  _minDateChanged: function() {
    if(typeof this.minDate === 'string') {
      if(this.timeZone) {
        this.minDate = Px.moment.tz(this.minDate, this.timeZone);
      } else {
        this.minDate = Px.moment(this.minDate);
      }
    }
  },
  _maxDateChanged: function() {
    if(typeof this.maxDate === 'string') {
      if(this.timeZone) {
        this.maxDate = Px.moment.tz(this.maxDate, this.timeZone);
      } else {
        this.maxDate = Px.moment(this.maxDate);
      }
    }
  },
  /**
   * Copies the time in toPreserve to dest and returns dest.
   * used in `px-calendar-picker`, `px-datetime-picker`, and `px-datetime-range-panel`
   *
   * @param {} toPreserve
   * @param {} dest
   */
  _preserveTime: function(toPreserve, dest) {
    if(toPreserve && dest) {
      dest.hours(toPreserve.hours());
      dest.minutes(toPreserve.minutes());
      dest.seconds(toPreserve.seconds());
      dest.milliseconds(toPreserve.milliseconds());
    }
    return dest;
  }
}, IronA11yKeysBehavior, PxDatetimeBehavior.BlockDates, AppLocalizeBehavior];
