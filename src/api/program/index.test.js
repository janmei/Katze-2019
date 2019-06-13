import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Program } from '.'

const app = () => express(apiRoot, routes)

let program

beforeEach(async () => {
  program = await Program.create({})
})

test('POST /programs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', time: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.time).toEqual('test')
})

test('GET /programs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /programs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${program.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(program.id)
})

test('GET /programs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /programs/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${program.id}`)
    .send({ title: 'test', time: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(program.id)
  expect(body.title).toEqual('test')
  expect(body.time).toEqual('test')
})

test('PUT /programs/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', time: 'test' })
  expect(status).toBe(404)
})

test('DELETE /programs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${program.id}`)
  expect(status).toBe(204)
})

test('DELETE /programs/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
