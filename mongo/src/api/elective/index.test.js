import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Elective } from '.'

const app = () => express(apiRoot, routes)

let elective

beforeEach(async () => {
  elective = await Elective.create({})
})

test('POST /electives 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', prof: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.prof).toEqual('test')
  expect(body.description).toEqual('test')
})

test('GET /electives 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /electives/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${elective.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(elective.id)
})

test('GET /electives/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /electives/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${elective.id}`)
    .send({ name: 'test', prof: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(elective.id)
  expect(body.name).toEqual('test')
  expect(body.prof).toEqual('test')
  expect(body.description).toEqual('test')
})

test('PUT /electives/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', prof: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /electives/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${elective.id}`)
  expect(status).toBe(204)
})

test('DELETE /electives/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
