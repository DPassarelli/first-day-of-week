const { DateTime } = require('luxon')

/**
 * Returns an instance of DateTime that represents the first Monday on or before
 * the specified date. This can be changed to return the first Sunday instead.
 *
 * @param  {Date|DateTime}   dt      The date to start from.
 *
 * @param  {String?}         basis   If set to 'sunday', then the day
 *                                   immediately preceding the first Monday on
 *                                   or before the specified date will be
 *                                   returned instead. Any other value will be
 *                                   ignored.
 *
 * @return {DateTime}
 */
function getFirstDayOfWeek (dt, basis) {
  /**
   * @license
   * Copyright (c) 2021, David Passarelli <dpassarelli@camelotcg.com>
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   */

  // convert native Date to DateTime instance
  if (dt instanceof Date) {
    dt = DateTime.fromJSDate(dt)
  }

  if (!DateTime.isDateTime(dt)) {
    throw new Error('The first parameter is required and must be a JavaScript Date object, or an instance of luxon\'s DateTime class.')
  }

  // provide a default value, otherwise `toLowerCase()` may throw an error
  basis = basis || 'monday'

  if (basis.toLowerCase() === 'sunday') {
    // https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-weekday
    if (dt.weekday === 7) {
      return dt
    }

    // luxon always considers Monday as first day of week
    return dt.startOf('week').minus({ day: 1 })
  }

  // luxon always considers Monday as first day of week
  return dt.startOf('week')
}

module.exports = getFirstDayOfWeek
