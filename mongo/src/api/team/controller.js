import { success, notFound } from '../../services/response/'
import { Team } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Team.create(body)
    .then((team) => team.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Team.count(query)
    .then(count => Team.find(query, select, cursor)
      .then((teams) => ({
        count,
        rows: teams.map((team) => team.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Team.findById(params.id)
    .then(notFound(res))
    .then((team) => team ? team.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Team.findById(params.id)
    .then(notFound(res))
    .then((team) => team ? Object.assign(team, body).save() : null)
    .then((team) => team ? team.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Team.findById(params.id)
    .then(notFound(res))
    .then((team) => team ? team.remove() : null)
    .then(success(res, 204))
    .catch(next)
