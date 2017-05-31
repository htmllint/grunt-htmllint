'use strict';

var exec = require('child_process').exec;

var REG_TOTAL = /\d+(?= errors in total)/gm;
var REG_CODES = /E\d+(?=\))/gm;

exports.htmllint = {
  default_options: function(test) { 
    exec('grunt htmllint:default_options', function(err, output) {

      var total = Number(output.match(REG_TOTAL)[0]);
      var codes = output.match(REG_CODES);

      test.equal(err, undefined);
      test.ok(output);

      test.equal(total, 8);
      test.ok(codes.indexOf('E001') !== -1);
      
      test.done();
    });
  },

  rc_file: function(test) {
    exec('grunt htmllint:rc_file', function(err, output) {

      var total = Number(output.match(REG_TOTAL)[0]);
      var codes = output.match(REG_CODES);

      test.equal(err, undefined);
      test.ok(output);

      test.equal(total, 7);
      test.ok(codes.indexOf('E001') === -1);

      test.done();
    });
  },

  permissive: function(test) {
    exec('grunt htmllint:permissive', function(err, output) {

      var total = Number(output.match(REG_TOTAL)[0]);
      var codes = output.match(REG_CODES);

      test.equal(err, undefined);
      test.ok(output);

      test.equal(total, 7);
      test.ok(codes.indexOf('E001') === -1);

      test.done();
    });
  },


  bail: function(test) {
    exec('grunt htmllint:bail', function(err, output) {

      var total = Number(output.match(REG_TOTAL)[0]);
      var codes = output.match(REG_CODES);

      test.equal(err, undefined);
      test.ok(output);

      test.equal(total, 1);
      test.ok(codes.indexOf('E001') === -1);

      test.done();
    });
  },

  htmllintrc: function(test) {
    exec('grunt htmllint:htmllintrc', function(err, output) {

      var total = Number(output.match(REG_TOTAL)[0]);
      var codes = output.match(REG_CODES);

      test.equal(err, undefined);
      test.ok(output);

      test.equal(total, 7);
      test.ok(codes.indexOf('E001') === -1);

      test.done();
    });
  },

  fail: function(test) {
    exec('grunt htmllint:fail', function(err, output) {

      var total = Number(output.match(REG_TOTAL)[0]);
      var codes = output.match(REG_CODES);

      test.ok(err);
      test.ok(output);

      test.equal(total, 8);
      test.ok(codes.indexOf('E001') !== -1);

      test.done();
    });
  },
};
