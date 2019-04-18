import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Day, { schema } from './model'

const router = new Router()
const { program, date } = schema.tree

/**
 * @api {post} /days Create day
 * @apiName CreateDay
 * @apiGroup Day
 * @apiParam program Day's program.
 * @apiParam date Day's date.
 * @apiSuccess {Object} day Day's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Day not found.
 */
router.post('/',
  body({ program, date }),
  create)

/**
 * @api {get} /days Retrieve days
 * @apiName RetrieveDays
 * @apiGroup Day
 * @apiUse listParams
 * @apiSuccess {Object[]} days List of days.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /days/:id Retrieve day
 * @apiName RetrieveDay
 * @apiGroup Day
 * @apiSuccess {Object} day Day's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Day not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /days/:id Update day
 * @apiName UpdateDay
 * @apiGroup Day
 * @apiParam program Day's program.
 * @apiParam date Day's date.
 * @apiSuccess {Object} day Day's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Day not found.
 */
router.put('/:id',
  body({ program, date }),
  update)

/**
 * @api {delete} /days/:id Delete day
 * @apiName DeleteDay
 * @apiGroup Day
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Day not found.
 */
router.delete('/:id',
  destroy)

export default router
