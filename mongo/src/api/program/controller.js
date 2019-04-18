import { success, notFound } from '../../services/response/'
import { Program } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Program.create(body)
    .then((program) => program.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Program.count(query)
    .then(count => Program.find(query, select, cursor)
      .then((programs) => ({
        count,
        rows: programs.map((program) => program.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Program.findById(params.id)
    .then(notFound(res))
    .then((program) => program ? program.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Program.findById(params.id)
    .then(notFound(res))
    .then((program) => program ? Object.assign(program, body).save() : null)
    .then((program) => program ? program.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Program.findById(params.id)
    .then(notFound(res))
    .then((program) => program ? program.remove() : null)
    .then(success(res, 204))
    .catch(next)
