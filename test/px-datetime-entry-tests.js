/**
 * DATETIME-ENTRY-CELL
 */
suite('Interaction px-datetime-entry cell', function () {

  let dateFixt, timeFixt, now;

  setup(function(done) {
    dateFixt = fixture('dateEntryDropdown');
    timeFixt = fixture('timeEntry');
    now = Px.moment();
    dateFixt.momentObj = now;
    timeFixt.momentObj = now;

    flush(()=>{
      done();
    });

  });


  //Would love to use MockInteractions but can't get it working for the life of me
  test('cell keyboard autocomplete on leaving', function (done) {
    flush(() => {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        firstInput = Polymer.dom(cells[0].root).querySelector('input');

      firstInput.focus();
      firstInput.value = "22";
      cells[0]._handleBlur();
      assert.equal(firstInput.value, 2022);
      done();
    });
  });

  // SHOULD WORK. I don't know how to get .focus to work
  // test('auto move to next cell', function (done) {
  //   var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
  //       secondInput = Polymer.dom(cells[1].root).querySelector('input');
  //     secondInput.focus();
  //     // MockInteractions.focus(secondInput);
  //     flush(() => {
  //       async.until(
  //         function () {
  //           secondInput = Polymer.dom(cells[1].root).querySelector('input');
  //           return secondInput.value === "11";
  //         },
  //         function (callback) {
  //           MockInteractions.pressAndReleaseKeyOn(secondInput, 49, [], "1");
  //           setTimeout(callback, 1000);
  //         },
  //         function (err, n) {
  //             debugger
  //             // check the active cell is the day cell
  //             done();
  //           }
  //         );
  //       });

  //     });


    test('move cells with right arrow', function (done) {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');
          firstInput = Polymer.dom(cells[0].root).querySelector('input');

      //simulate focus on first cell....
      cells[0].focus();

      var listener = function (evt) {
        assert.equal(evt.detail.dir, 1);
        cells[0].removeEventListener('px-entry-cell-move', listener);
        done();
      };

      //pressing right arrow should move to the next cell.
      //Unfortunately our code relies on focus() which doesn't seem to
      //work in the testing environment. Instead listen to the event that will result
      //in the cell to be changed
      cells[0].addEventListener('px-entry-cell-move', listener);
      MockInteractions.pressAndReleaseKeyOn(firstInput, 39, [], "ArrowRight");
    });


    test('previous field when pressing left on first cell', function (done) {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[0].focus();

      var listener = function (evt) {
        assert.equal(evt.detail.dateOrTime, "Date");
        dateFixt.removeEventListener('px-previous-field', listener);
        done();
      };
      //pressing left arrow on first cell should fire previous field event
      dateFixt.addEventListener('px-previous-field', listener);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 37, [], "ArrowLeft");
    });


    test('NOT previous field when pressing left on last cell', function (done) {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[1].focus();

      //The test fails if it get in this function
      var listener = function (evt) {
        assert.isTrue(false);
        dateFixt.removeEventListener('px-previous-field', listener);
        done();
      };
      //pressing left arrow on first cell should fire previous field event
      dateFixt.addEventListener('px-previous-field', listener);
      MockInteractions.pressAndReleaseKeyOn(cells[1], 37, [], "ArrowLeft");

      setTimeout(function () {
        dateFixt.removeEventListener('px-previous-field', listener);
        done();
      }, 200);
    });


    test('next field when pressing right on last cell', function (done) {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          lastCell = cells[cells.length - 1];

      //simulate focus on first cell....
      lastCell.focus();

      var listener = function (evt) {
        dateFixt.removeEventListener('px-next-field', listener);
        done();
      };

      //pressing right arrow on last cell should fire next field event
      dateFixt.addEventListener('px-next-field', listener);
      MockInteractions.pressAndReleaseKeyOn(lastCell, 39, [], 'ArrowRight');
    });


    test('NOT previous field when pressing left on last cell', function (done) {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
          firstCell = cells[0];

      //simulate focus on first cell....
      firstCell.focus();

      //The test fails if it get in this function
      var listener = function (evt) {
        assert.isTrue(false);
        dateFixt.removeEventListener('px-next-field', listener);
        done();
      };
      //pressing left arrow on first cell should fire previous field event
      dateFixt.addEventListener('px-next-field', listener);
      MockInteractions.pressAndReleaseKeyOn(firstCell, 39, [], 'ArrowRight');

      setTimeout(function () {
        dateFixt.removeEventListener('px-next-field', listener);
        done();
      }, 200);
    });


    test('move cells with left arrow', function (done) {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell');

      //simulate focus on first cell....
      cells[0].focus();

      var listener = function (evt) {
        assert.equal(evt.detail.dir, -1);
        cells[0].removeEventListener('px-entry-cell-move', listener);
        done();
      };

      //pressing right arrow should move to the next cell.
      //Unfortunately our code relies on focus() which doesn't seem to
      //work in the testing environment. Instead listen to the event that will result
      //in the cell to be changed
      cells[0].addEventListener('px-entry-cell-move', listener);
      MockInteractions.pressAndReleaseKeyOn(cells[0], 37, [], "ArrowLeft");
    });


    test('click on date icon fires event', function (done) {
      var iconLabel = Polymer.dom(dateFixt.root).querySelector('#icon');

      var listener = function (evt) {
        assert.equal(evt.detail.dateOrTime, 'Date');
        done();
      };

      dateFixt.addEventListener('px-datetime-entry-icon-clicked', listener);
      iconLabel.click();
    });


    test('click on time icon fires event', function (done) {
      var iconLabel = Polymer.dom(timeFixt.root).querySelector('#icon');

      var listener = function (evt) {
        assert.equal(evt.detail.dateOrTime, 'Time');
        done();
      };

      timeFixt.addEventListener('px-datetime-entry-icon-clicked', listener);
      iconLabel.click();
    });

    // SHOULD WORK
    // test('AM/PM', function () {
    //   var cells = Polymer.dom(timeFixt.root).querySelectorAll('px-datetime-entry-cell'),
    //   lastCell = cells[cells.length - 1],
    //   lastInput = Polymer.dom(lastCell.root).querySelectorAll('#dtEntry');

    //   //focus last cell
    //   lastCell.focus();

    //   // debugger
    //   MockInteractions.pressAndReleaseKeyOn(lastCell, 65, [], 'a');
    //   assert.equal(lastInput[0].placeholder, 'AM', "AM 1st time");
    //   MockInteractions.pressAndReleaseKeyOn(lastCell, 80, [], 'p');
    //   assert.equal(lastInput[0].placeholder, 'PM', "PM 1st time");
    //   MockInteractions.pressAndReleaseKeyOn(lastCell, 65, [], 'a');
    //   assert.equal(lastInput[0].placeholder, 'AM', "AM 2nd time");
    //   MockInteractions.pressAndReleaseKeyOn(lastCell, 38, [], 'ArrowUp');
    //   assert.equal(lastInput[0].placeholder, 'PM', "PM 2nd time");
    //   MockInteractions.pressAndReleaseKeyOn(lastCell,  40, [], 'ArrowDown');
    //   assert.equal(lastInput[0].placeholder, 'AM', "AM 3rd time");
    // });


  });


/**
 * DATETIME-ENTRY
 */
suite('Interaction px-datetime-entry', function () {

  let dateFixt, dateExFixt, timeFixt, timeAbbTextFixt, now;

  setup(function(done) {
    now = Px.moment();

    flush(()=>{
      done();
    });

  });


  test('dropdown mode uses a px-dropdown', function (done) {
    dateFixt = fixture('dateEntryDropdown');
    dateFixt.momentObj = now;

    flush(function () {
      var dropdown = Polymer.dom(dateFixt.root).querySelector('px-dropdown'),
          text = Polymer.dom(dateFixt.root).querySelector('#timeZoneText');

      assert.isNotNull(dropdown);
      assert.isNull(text);
      assert.notEqual(dropdown.style.display, 'none');
      done();
    });
  });

  test('extended dropdown mode uses a px-dropdown', function (done) {
    dateExFixt = fixture('dateEntryExtDropdown');
    dateExFixt.momentObj = now;

    flush(function () {
      var dropdown = Polymer.dom(dateExFixt.root).querySelector('px-dropdown'),
          text = Polymer.dom(dateExFixt.root).querySelector('#timeZoneText');

      assert.isNotNull(dropdown);
      assert.isNull(text);
      assert.notEqual(dropdown.style.display, 'none');
      done();
    });
  });

  test('text mode uses a span', function (done) {
    timeFixt = fixture('timeEntry');
    timeFixt.momentObj = now;

    flush(function () {
      var text = Polymer.dom(timeFixt.root).querySelector('#timeZoneText'),
          dropdown = Polymer.dom(timeFixt.root).querySelector('px-dropdown');

      assert.isNotNull(text);
      assert.isNull(dropdown);
      assert.notEqual(text.style.display, 'none');
      done();
    });
  });

  test('text mode uses a span', function (done) {
    timeFixt = fixture('timeEntry');
    timeFixt.momentObj = now;
    timeFixt.showTimeZone = 'abbreviatedText';

    flush(function () {
      debugger
      var text = Polymer.dom(timeFixt.root).querySelector('#timeZoneText'),
          dropdown = Polymer.dom(timeFixt.root).querySelector('px-dropdown');

      assert.isNotNull(text);
      assert.isNull(dropdown);
      assert.notEqual(text.style.display, 'none');
      done();
    });
  });


  test('auto validation', function (done) {
    dateFixt = fixture('dateEntryDropdown');
    dateFixt.momentObj = now;

    flush(() => {
      var cells = Polymer.dom(dateFixt.root).querySelectorAll('px-datetime-entry-cell'),
        secondInput = Polymer.dom(cells[1].root).querySelector('input');

      //simulate focus on second cell....
      secondInput.focus();

      //change value to 99
      secondInput.value = "99";
      cells[1]._handleBlur();

      //wait for validation to kick in
      setTimeout(function () {
        cells[1];
        assert.isFalse(dateFixt.isValid);
        done();
      }, 500);
    });
  });


  test('Block future dates', function (done) {
    dateExFixt = fixture('dateEntryExtDropdown');
    dateExFixt.momentObj = now;

    flush(() => {
      var cells = Polymer.dom(dateExFixt.root).querySelectorAll('px-datetime-entry-cell'),
        firstInput = Polymer.dom(cells[0].root).querySelector('input');

      //simulate focus on first cell....
      firstInput.focus();

      //change value to 99
      firstInput.value = "18";
      cells[0]._handleBlur();

      //wait for validation to kick in
      setTimeout(function () {
        assert.isFalse(dateExFixt.isValid);
        done();
      }, 200);
    });
  });



});






