import { success, notFound } from '../../services/response/'
import { View } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  View.create(body)
    .then((view) => view.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  View.count(query)
    .then(count => View.find(query, select, cursor)
      .then((views) => (
        views.map((view) => view.view())
      ))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  View.findById(params.id)
    .then(notFound(res))
    .then((view) => view ? view.view() : null)
    .then(success(res))
    .catch(next)

export const update = (req, res, next) =>
  View.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  View.findById(params.id)
    .then(notFound(res))
    .then((view) => view ? view.remove() : null)
    .then(success(res, 204))
    .catch(next)
