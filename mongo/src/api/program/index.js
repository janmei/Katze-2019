import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Program, { schema } from './model'

const router = new Router()
const { title, time } = schema.tree

/**
 * @api {post} /programs Create program
 * @apiName CreateProgram
 * @apiGroup Program
 * @apiParam title Program's title.
 * @apiParam time Program's time.
 * @apiSuccess {Object} program Program's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Program not found.
 */
router.post('/',
  body({ title, time }),
  create)

/**
 * @api {get} /programs Retrieve programs
 * @apiName RetrievePrograms
 * @apiGroup Program
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of programs.
 * @apiSuccess {Object[]} rows List of programs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /programs/:id Retrieve program
 * @apiName RetrieveProgram
 * @apiGroup Program
 * @apiSuccess {Object} program Program's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Program not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /programs/:id Update program
 * @apiName UpdateProgram
 * @apiGroup Program
 * @apiParam title Program's title.
 * @apiParam time Program's time.
 * @apiSuccess {Object} program Program's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Program not found.
 */
router.put('/:id',
  body({ title, time }),
  update)

/**
 * @api {delete} /programs/:id Delete program
 * @apiName DeleteProgram
 * @apiGroup Program
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Program not found.
 */
router.delete('/:id',
  destroy)

export default router
