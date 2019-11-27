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
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import '../px-datetime-entry.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-datetime-common" description="The base component for all the \`px-datetime\` and \`px-rangepicker\` components. It holds the functionality for the entry, buttons, presets, and behaviors">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}" config="[[chosenConfig]]"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component" class="px-datetime-common-demo">
        <p class="u-mb0">Event fired: <strong>px-datetime-submitted</strong></p>
        <p class="zeta u-mt0">See API Reference below for more details</p>
        <px-datetime-entry resources="{{props.resources.value}}" block-future-dates="{{props.blockFutureDates.value}}" block-past-dates="{{props.blockPastDates.value}}" hide-icon="{{props.hideIcon.value}}" date-or-time="{{props.dateOrTime.value}}" show-time-zone="{{props.showTimeZone.value}}" time-zone="{{props.timeZone.value}}" moment-format="{{props.momentFormat.value}}" min-date="{{props.minDate.value}}" max-date="{{props.maxDate.value}}">
        </px-datetime-entry>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-datetime-common">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <!-- <px-demo-api-viewer source="px-datetime-common"></px-demo-api-viewer> -->

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'local-element-demo',

  properties: {

    /**
     * @property demoProps
     * @type {Object}
     */
    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    /**
     * @property demoProps
     * @type {Array}
     */
    configs: {
      type: Array,
      value: function(){
        return [
          {
            blockFutureDates:false,
            blockPastDates:false,
            hideIcon:false,
            momentFormat:"MM/DD/YY",
            dateOrTime:"date",
            showTimeZone:"text",
            timeZone: "UTC"
          }
        ]
      }
    }
  },

  /**
   * A reference for `this.props`. Read the documentation there.
   */
  demoProps: {

    resources: {
      type: Object,
      defaultValue: {"en":{"YY":"Year","MM":"Month","DD":"Day"}},
      inputType: 'code:JSON'
    },

    blockFutureDates: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    blockPastDates: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    hideIcon: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    momentFormat: {
      type: String,
      defaultValue: 'MM/DD/YY',
      inputType: 'text',
      inputPlaceholder: 'YYYY/MM/DD'
    },

    dateOrTime: {
      type: String,
      defaultValue: 'date',
      inputType: 'dropdown',
      inputChoices: ['date', 'time']
    },

    showTimeZone: {
      type: String,
      defaultValue: 'text',
      inputType: 'dropdown',
      inputChoices: ['dropdown', 'extendedDropdown', 'text', 'abbreviatedText']
    },

    timeZone: {
      type: String,
      defaultValue: 'UTC',
      inputType: 'text',
      inputPlaceholder: 'UTC'
    },

    minDate: {
      type: String,
      defaultValue: Px.moment().subtract(3, 'month').toISOString(),
      inputType: 'text',
      inputPlaceholder: 'ISOString'
    },

    maxDate: {
      type: String,
      defaultValue: Px.moment().add(3, 'month').toISOString(),
      inputType: 'text',
      inputPlaceholder: 'ISOString'
    },

  }
});
