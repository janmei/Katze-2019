import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Day } from '.'

const app = () => express(apiRoot, routes)

let day

beforeEach(async () => {
  day = await Day.create({})
})

test('POST /days 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ program: 'test', date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.program).toEqual('test')
  expect(body.date).toEqual('test')
})

test('GET /days 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /days/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${day.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(day.id)
})

test('GET /days/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /days/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${day.id}`)
    .send({ program: 'test', date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(day.id)
  expect(body.program).toEqual('test')
  expect(body.date).toEqual('test')
})

test('PUT /days/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ program: 'test', date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /days/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${day.id}`)
  expect(status).toBe(204)
})

test('DELETE /days/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
