import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export View, { schema } from './model'

const router = new Router()
const { content, animation, name } = schema.tree

/**
 * @api {post} /views Create view
 * @apiName CreateView
 * @apiGroup View
 * @apiParam content View's content.
 * @apiParam animation View's animation.
 * @apiParam name View's name.
 * @apiSuccess {Object} view View's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 View not found.
 */
router.post('/',
  body({ content, animation, name }),
  create)

/**
 * @api {get} /views Retrieve views
 * @apiName RetrieveViews
 * @apiGroup View
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of views.
 * @apiSuccess {Object[]} rows List of views.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /views/:id Retrieve view
 * @apiName RetrieveView
 * @apiGroup View
 * @apiSuccess {Object} view View's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 View not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /views/:id Update view
 * @apiName UpdateView
 * @apiGroup View
 * @apiParam content View's content.
 * @apiParam animation View's animation.
 * @apiParam name View's name.
 * @apiSuccess {Object} view View's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 View not found.
 */
router.put('/:id',
  body({ content, animation, name }),
  update)

/**
 * @api {delete} /views/:id Delete view
 * @apiName DeleteView
 * @apiGroup View
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 View not found.
 */
router.delete('/:id',
  destroy)

export default router
