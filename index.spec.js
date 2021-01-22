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
    })
  })
})
