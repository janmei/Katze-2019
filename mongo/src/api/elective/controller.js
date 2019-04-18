import { success, notFound } from '../../services/response/'
import { Elective } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Elective.create(body)
    .then((elective) => elective.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Elective.count(query)
    .then(count => Elective.find(query, select, cursor)
      .then((electives) => ({
        count,
        rows: electives.map((elective) => elective.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Elective.findById(params.id)
    .then(notFound(res))
    .then((elective) => elective ? elective.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Elective.findById(params.id)
    .then(notFound(res))
    .then((elective) => elective ? Object.assign(elective, body).save() : null)
    .then((elective) => elective ? elective.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Elective.findById(params.id)
    .then(notFound(res))
    .then((elective) => elective ? elective.remove() : null)
    .then(success(res, 204))
    .catch(next)
