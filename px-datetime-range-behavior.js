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
import './px-datetime-shared-behavior.js';

var PxDatetimeBehavior = window.PxDatetimeBehavior = (window.PxDatetimeBehavior || {});

/**
 * Provides the fromMoment and toMoment properties
 *
 * @polymerBehavior PxDatetimeBehavior.RangeMoments
 */
PxDatetimeBehavior.RangeMoments = {
  properties: {
    /**
     * Moment object start date & time
     */
    fromMoment: {
      type: Object,
      notify: true,
      value: function() {
        return null;
      }
    },
    /**
     * Moment object end date & time
     */
    toMoment: {
      type: Object,
      notify: true,
      value: function() {
        return null;
      }
    }
  }
};

/**
 * For all `px-{datetime}-range-{picker}` components
 *
 * @polymerBehavior PxDatetimeBehavior.Range
 */
PxDatetimeBehavior.Range = [{
  properties: {

    /**
     * (optional:  'px-{datetime}-range-panel')
     *
     * The preset date/time ranges to be displayed.
     *
     *```
     *   [
     *    {
     *      "displayText": "Last 5 Minutes",
     *      "startDateTime": "2013-02-04T22:44:30.652Z",
     *      "endDateTime": "2013-02-04T22:49:30.652Z"
     *    },
     *    {
     *      "displayText": "Last 12 Hours",
     *      "startDateTime": function() {return moment().subtract(1, 'days').toISOString();},
     *      "endDateTime": function() {return moment().startOf('day').toISOString();}
     *    }
     *   ]
     * ```
     *
     * @default no presetRanges
     */
    presetRanges: {
     type: Object, //may be useless
    }
  },
  observers: [
    '_localeChanged(language)',
    '_timeZoneChanged(timeZone)'
  ],
  /**
   * make sure the moment obj picks up the possibly new moment locale
   */
  _localeChanged: function() {
    if(this.language !== undefined) {
      if(this.fromMoment) {
        this.set('fromMoment', this.fromMoment.locale(Px.moment.locale()));
      }
      if(this.toMoment) {
        this.set('toMoment', this.toMoment.locale(Px.moment.locale()));
      }
    }
  },
  /**
   * makes sure the moment objects reflect the timezone
   */
  _timeZoneChanged: function() {
    if(this.timeZone !== undefined) {
      if(this.fromMoment) {
        var newMom = this.fromMoment.clone().tz(this.timeZone);
        this.set('fromMoment', newMom);
      }
      if(this.toMoment) {
        newMom = this.toMoment.clone().tz(this.timeZone);
        this.set('toMoment', newMom);
      }
    }
  },
  /**
   * Validation for the range. Makes sure the ranges are in chronological order
   *
   * @return {Boolean} true if chronological order, false otherwise
   */
  _validateRangeOrder: function(fromMoment, toMoment) {
    // if the from date is before the to date, everything is ok
    if(fromMoment === null && toMoment === null) {
      return true;
    } if(fromMoment && toMoment) {
      return fromMoment.isBefore(toMoment);
    } else {
      return false;
    }
  },
}, PxDatetimeBehavior.Shared, PxDatetimeBehavior.RangeMoments];

/**
 * Adds a temp moment object that can be applied or used to rollback
 *
 * @polymerBehavior PxDatetimeBehavior.TempRange
 */
PxDatetimeBehavior.TempRange = [{

  properties: {
    /**
     * Temporary from moment object used for validation and displaying.
     * This object should be used by subcomponents when we want to "try"
     * a value and see the result of validation AND/OR give us the ability
     * to rollback (cancel) or apply
     */
    _tempFromMomentObj: {
      type: Object,
      notify: true
    },
    /**
     * Temporary to moment object used for validation and displaying.
     * This object should be used by subcomponents when we want to "try"
     * a value and see the result of validation AND/OR give us the ability
     * to rollback (cancel) or apply
     */
    _tempToMomentObj: {
      type: Object,
      notify: true
    }
  },

  observers: ['_localeChangedTemp(language)',
              '_timeZoneChangedTemp(timeZone)',
              //momentObj is the source of truth and should always
              //trump temp if changed
              '_rollbackTempFromMoment(fromMoment)',
              '_rollbackTempToMoment(toMoment)'],

  /**
   * Applies value of temp moment to public momentObj
   */
  _applyTempRangeMoment: function() {

    var changed = false;
    if(this.fromMoment === null || this._tempFromMomentObj === null || this.fromMoment.toISOString() !== this._tempFromMomentObj.toISOString()) {
      this.set('fromMoment', this._tempFromMomentObj);
      changed = true;
    }

    if(this.toMoment === null || this._tempToMomentObj === null || this.toMoment.toISOString() !== this._tempToMomentObj.toISOString()) {
      this.set('toMoment', this._tempToMomentObj);
      changed = true;
    }

    return changed;
  },
  /**
   * Rollback value of temp fromMoment to use public momentObj
   */
   _rollbackTempFromMoment: function(fromMoment) {
    this.set('_tempFromMomentObj', this.fromMoment);
  },
  /**
   * Rollback value of temp toMoment to use public momentObj
   */
   _rollbackTempToMoment: function(toMoment) {
    this.set('_tempToMomentObj', this.toMoment);
  },
  /**
   * make sure the moment obj pick up the possibly new moment locale
   */
   _localeChangedTemp: function() {
    if(this.language !== undefined) {
      if(this._tempFromMomentObj) {
        this.set('_tempFromMomentObj', this._tempFromMomentObj.locale(Px.moment.locale()));
      }
      if(this._tempToMomentObj) {
        this.set('_tempToMomentObj', this._tempToMomentObj.locale(Px.moment.locale()));
      }
    }
  },
  /**
   * makes sure the moment objects reflect the timezone
   */
   _timeZoneChangedTemp: function() {
    if(this.timeZone !== undefined) {
      if(this._tempFromMomentObj) {
        this.set('_tempFromMomentObj', this._tempFromMomentObj.clone().tz(this.timeZone));
      }
      if(this._tempToMomentObj) {
        this.set('_tempToMomentObj', this._tempToMomentObj.clone().tz(this.timeZone));
      }
    }
  },
}, PxDatetimeBehavior.Range];
