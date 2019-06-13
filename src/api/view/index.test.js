import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { View } from '.'

const app = () => express(apiRoot, routes)

let view

beforeEach(async () => {
  view = await View.create({})
})

test('POST /views 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ content: 'test', animation: 'test', name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.content).toEqual('test')
  expect(body.animation).toEqual('test')
  expect(body.name).toEqual('test')
})

test('GET /views 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /views/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${view.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(view.id)
})

test('GET /views/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /views/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${view.id}`)
    .send({ content: 'test', animation: 'test', name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(view.id)
  expect(body.content).toEqual('test')
  expect(body.animation).toEqual('test')
  expect(body.name).toEqual('test')
})

test('PUT /views/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ content: 'test', animation: 'test', name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /views/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${view.id}`)
  expect(status).toBe(204)
})

test('DELETE /views/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
