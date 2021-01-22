const { DateTime } = require('luxon')

function getFirstDayOfWeek (dt, basedOn) {
  /*
    ISC License

    Copyright (c) 2021, David Passarelli <dpassarelli@camelotcg.com>

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   */

  if (dt == null) {
    throw new Error('The first parameter is required and must be a JavaScript Date object, or an instance of luxon\'s DateTime class.')
  }

  if (!(dt instanceof Date) && !DateTime.isDateTime(dt)) {
    throw new Error('The first parameter is required and must be a JavaScript Date object, or an instance of luxon\'s DateTime class.')
  }

  if (dt instanceof Date) {
    dt = DateTime.fromJSDate(dt)
  }

  basedOn = basedOn || 'monday'

  if (basedOn.toLowerCase() === 'sunday') {
    return dt.startOf('week').minus({ day: 1 })
  }

  return dt.startOf('week')
}

module.exports = getFirstDayOfWeek
