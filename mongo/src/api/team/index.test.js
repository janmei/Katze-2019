import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Team } from '.'

const app = () => express(apiRoot, routes)

let team

beforeEach(async () => {
  team = await Team.create({})
})

test('POST /teams 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ persons: 'test', abstract: 'test', name: 'test', image: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.persons).toEqual('test')
  expect(body.abstract).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.image).toEqual('test')
})

test('GET /teams 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /teams/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${team.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(team.id)
})

test('GET /teams/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /teams/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${team.id}`)
    .send({ persons: 'test', abstract: 'test', name: 'test', image: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(team.id)
  expect(body.persons).toEqual('test')
  expect(body.abstract).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.image).toEqual('test')
})

test('PUT /teams/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ persons: 'test', abstract: 'test', name: 'test', image: 'test' })
  expect(status).toBe(404)
})

test('DELETE /teams/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${team.id}`)
  expect(status).toBe(204)
})

test('DELETE /teams/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
