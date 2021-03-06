import { success, notFound } from '../../services/response/'
import { Semester } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Semester.create(body)
    .then((semester) => semester.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Semester.find(query, select, cursor)
    .populate('teams')
    .then((semesters) => semesters.map((semester) => semester.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Semester.findOne({ year: params.year })
    .populate('teams')
    .then(notFound(res))
    .then((semester) => semester ? semester.view(true) : null)
    .then(success(res))
    .catch(next)

export const update = (req, res, next) =>
  Semester.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Semester.findById(params.id)
    .then(notFound(res))
    .then((semester) => semester ? semester.remove() : null)
    .then(success(res, 204))
    .catch(next)
