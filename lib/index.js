'use strict';

var _require = require('./Collapse'),
    Collapse = _require.Collapse;

var _require2 = require('./UnmountClosed'),
    UnmountClosed = _require2.UnmountClosed;

Object.assign(UnmountClosed, { Collapse: Collapse, UnmountClosed: UnmountClosed });
module.exports = UnmountClosed;