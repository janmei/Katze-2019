import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Elective, { schema } from './model'

const router = new Router()
const { name, prof, description } = schema.tree

/**
 * @api {post} /electives Create elective
 * @apiName CreateElective
 * @apiGroup Elective
 * @apiParam name Elective's name.
 * @apiParam prof Elective's prof.
 * @apiParam description Elective's description.
 * @apiSuccess {Object} elective Elective's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Elective not found.
 */
router.post('/',
  body({ name, prof, description }),
  create)

/**
 * @api {get} /electives Retrieve electives
 * @apiName RetrieveElectives
 * @apiGroup Elective
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of electives.
 * @apiSuccess {Object[]} rows List of electives.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /electives/:id Retrieve elective
 * @apiName RetrieveElective
 * @apiGroup Elective
 * @apiSuccess {Object} elective Elective's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Elective not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /electives/:id Update elective
 * @apiName UpdateElective
 * @apiGroup Elective
 * @apiParam name Elective's name.
 * @apiParam prof Elective's prof.
 * @apiParam description Elective's description.
 * @apiSuccess {Object} elective Elective's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Elective not found.
 */
router.put('/:id',
  body({ name, prof, description }),
  update)

/**
 * @api {delete} /electives/:id Delete elective
 * @apiName DeleteElective
 * @apiGroup Elective
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Elective not found.
 */
router.delete('/:id',
  destroy)

export default router
