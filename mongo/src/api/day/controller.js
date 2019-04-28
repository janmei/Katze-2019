import { success, notFound } from '../../services/response/'
import { Day } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Day.create(body)
    .then((day) => day.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Day.find(query, select, cursor)
    .then((days) => days.map((day) => day.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Day.findById(params.id)
    .populate('program')
    .then(notFound(res))
    .then((day) => day ? day.view() : null)
    .then(success(res))
    .catch(next)

export const update = (req, res, next) =>
  Team.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Day.findById(params.id)
    .then(notFound(res))
    .then((day) => day ? day.remove() : null)
    .then(success(res, 204))
    .catch(next)
