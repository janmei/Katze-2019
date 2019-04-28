import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Team, { schema } from './model'

const router = new Router()
const { persons, abstract, name, image, semester } = schema.tree

/**
 * @api {post} /teams Create team
 * @apiName CreateTeam
 * @apiGroup Team
 * @apiParam persons Team's persons.
 * @apiParam abstract Team's abstract.
 * @apiParam name Team's name.
 * @apiParam image Team's image.
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 */
router.post('/',
  body({ persons, abstract, name, image, semester }),
  create)

/**
 * @api {get} /teams Retrieve teams
 * @apiName RetrieveTeams
 * @apiGroup Team
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of teams.
 * @apiSuccess {Object[]} rows List of teams.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /teams/:id Retrieve team
 * @apiName RetrieveTeam
 * @apiGroup Team
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /teams/:id Update team
 * @apiName UpdateTeam
 * @apiGroup Team
 * @apiParam persons Team's persons.
 * @apiParam abstract Team's abstract.
 * @apiParam name Team's name.
 * @apiParam image Team's image.
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 */
router.post('/:id',
  update)

/**
 * @api {delete} /teams/:id Delete team
 * @apiName DeleteTeam
 * @apiGroup Team
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Team not found.
 */
router.delete('/:id',
  destroy)

export default router
