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
      const ERR_INVALID_DT = 'The first parameter is required and must be a JavaScript Date object, or an instance of Luxon\'s DateTime class.'

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

      it('must throw an error if the first parameter is not a native Date or Luxon DateTime', () => {
        expect(() => {
          T('date')
        }).to.throw(ERR_INVALID_DT)
      })
    })

    context('expected output', () => {
      it('must be an instance of Luxon DateTime', () => {
        const actual = T(new Date())
        expect(actual).to.be.instanceof(DateTime)
      })

      context('without specifying which weekday to start on', () => {
        it('must refer to the latest Monday on or before the given date', () => {
          let day = new Date()

          while (day.getDay() !== 1) { // Sunday - Saturday : 0 - 6
            day = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1)
          }

          const a = DateTime.fromJSDate(day)
          const b = T(new Date())

          const expected = true
          const actual = b.hasSame(a, 'day')

          expect(actual).to.equal(expected)
        })
      })
    })
  })
})
