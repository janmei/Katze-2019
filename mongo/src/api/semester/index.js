import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Semester, { schema } from './model'

const router = new Router()
const { year, title, teams, description } = schema.tree

/**
 * @api {post} /semesters Create semester
 * @apiName CreateSemester
 * @apiGroup Semester
 * @apiParam year Semester's year.
 * @apiParam title Semester's title.
 * @apiParam teams Semester's teams.
 * @apiParam description Semester's description.
 * @apiSuccess {Object} semester Semester's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Semester not found.
 */
router.post('/',
  body({ year, title, teams, description }),
  create)

/**
 * @api {get} /semesters Retrieve semesters
 * @apiName RetrieveSemesters
 * @apiGroup Semester
 * @apiUse listParams
 * @apiSuccess {Object[]} semesters List of semesters.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /semesters/:year Retrieve semester
 * @apiName RetrieveSemester
 * @apiGroup Semester
 * @apiSuccess {Object} semester Semester's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Semester not found.
 */
router.get('/:year',
  show)

/**
 * @api {put} /semesters/:id Update semester
 * @apiName UpdateSemester
 * @apiGroup Semester
 * @apiParam year Semester's year.
 * @apiParam title Semester's title.
 * @apiParam teams Semester's teams.
 * @apiParam description Semester's description.
 * @apiSuccess {Object} semester Semester's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Semester not found.
 */
router.put('/:id',
  body({ year, title, teams, description }),
  update)

/**
 * @api {delete} /semesters/:id Delete semester
 * @apiName DeleteSemester
 * @apiGroup Semester
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Semester not found.
 */
router.delete('/:id',
  destroy)

export default router
