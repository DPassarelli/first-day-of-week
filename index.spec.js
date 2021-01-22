/* eslint-env mocha */

const { expect } = require('chai')
const { DateTime } = require('luxon')

/**
 * Code under test,
 * @type {any}
 */
const T = require('./index.js')

describe('the "first-day-of-week" module', () => {
  it('must export a function', () => {
    const expected = 'function'
    const actual = typeof T

    expect(actual).to.equal(expected)
  })

  describe('the exported function', () => {
    context('input validation', () => {
      const ERR_INVALID_DT = 'The first parameter is required and must be a JavaScript Date object, or an instance of luxon\'s DateTime class.'

      it('must throw an error if the first parameter is missing', () => {
        expect(() => {
          T()
        }).to.throw(ERR_INVALID_DT)
      })

      it('must throw an error if the first parameter is `null`', () => {
        expect(() => {
          T(null)
        }).to.throw(ERR_INVALID_DT)
      })

      it('must throw an error if the first parameter is not a native Date or luxon DateTime', () => {
        expect(() => {
          T('date')
        }).to.throw(ERR_INVALID_DT)
      })
    })

    context('side effects', () => {
      it('must not mutate the value passed in', () => {
        const dt = new Date(2021, 0, 1) // Jan 1, 2021
        const before = dt.toString()

        T(dt)

        const after = dt.toString()

        expect(after).to.equal(before)
      })
    })

    context('expected output', () => {
      /**
       * The calculated date for the most recent Monday on or before the current
       * date.
       * @type {Date}
       */
      let mondayOfCurrentWeek = new Date()

      /**
       * The calculated date for the most recent Sunday on or before the current
       * date.
       * @type {Date}
       */
      let sundayOfCurrentWeek = null

      /**
       * Executes a common test suite for different inputs.
       *
       * @param  {function}    factory   A function that returns an instance of
       *                                 expected object type for this run.
       *
       *                                 This function must accept a numeric
       *                                 value representing the number of milli-
       *                                 seconds since the Unix epoch, in order
       *                                 to set the value of the instance that
       *                                 is created. If no value is provided,
       *                                 then the function must return an
       *                                 instance representing the current date.
       *
       * @return {undefined}
       */
      function runCommonTests (factory) {
        context('when no basis is specified', () => {
          it('must refer to the latest Monday on or before the current date', () => {
            const expected = DateTime.fromJSDate(mondayOfCurrentWeek).toLocaleString()
            const actual = T(factory()).toLocaleString()

            expect(actual).to.equal(expected)
          })

          it('must refer to the same date if a Monday is passed in', () => {
            const expected = DateTime.fromJSDate(mondayOfCurrentWeek).toLocaleString()
            const actual = T(factory(mondayOfCurrentWeek.getTime())).toLocaleString()

            expect(actual).to.equal(expected)
          })
        })

        context('when Sunday is specified as the beginning of the week', () => {
          it('must refer to the latest Sunday on or before the current date (when specified in lowercase)', () => {
            const expected = DateTime.fromJSDate(sundayOfCurrentWeek).toLocaleString()
            const actual = T(factory(), 'sunday').toLocaleString()

            expect(actual).to.equal(expected)
          })

          it('must refer to the latest Sunday on or before the current date (when specified in mixed case)', () => {
            const expected = DateTime.fromJSDate(sundayOfCurrentWeek).toLocaleString()
            const actual = T(factory(), 'Sunday').toLocaleString()

            expect(actual).to.equal(expected)
          })

          it('must refer to the same date if a Sunday is passed in', () => {
            const expected = DateTime.fromJSDate(sundayOfCurrentWeek).toLocaleString()
            const actual = T(factory(sundayOfCurrentWeek.getTime()), 'sunday').toLocaleString()

            expect(actual).to.equal(expected)
          })
        })
      }

      before(() => {
        while (mondayOfCurrentWeek.getDay() !== 1) { // Sunday - Saturday : 0 - 6
          mondayOfCurrentWeek = new Date(mondayOfCurrentWeek.getFullYear(), mondayOfCurrentWeek.getMonth(), mondayOfCurrentWeek.getDate() - 1)
        }

        sundayOfCurrentWeek = new Date(mondayOfCurrentWeek.getFullYear(), mondayOfCurrentWeek.getMonth(), mondayOfCurrentWeek.getDate() - 1)
      })

      it('must be an instance of Luxon DateTime', () => {
        const actual = T(new Date())
        expect(actual).to.be.instanceof(DateTime)
      })

      context('when the input is a native DateTime', () => {
        runCommonTests((ms) => { return (ms ? new Date(ms) : new Date()) })
      })

      context('when the input is an instance of luxon DateTime', () => {
        runCommonTests((ms) => { return (ms ? DateTime.fromMillis(ms) : DateTime.local()) })
      })
    })
  })
})
