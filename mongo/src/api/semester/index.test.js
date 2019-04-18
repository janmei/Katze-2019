import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Semester } from '.'

const app = () => express(apiRoot, routes)

let semester

beforeEach(async () => {
  semester = await Semester.create({})
})

test('POST /semesters 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ year: 'test', title: 'test', teams: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.year).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.teams).toEqual('test')
  expect(body.description).toEqual('test')
})

test('GET /semesters 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /semesters/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${semester.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(semester.id)
})

test('GET /semesters/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /semesters/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${semester.id}`)
    .send({ year: 'test', title: 'test', teams: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(semester.id)
  expect(body.year).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.teams).toEqual('test')
  expect(body.description).toEqual('test')
})

test('PUT /semesters/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ year: 'test', title: 'test', teams: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /semesters/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${semester.id}`)
  expect(status).toBe(204)
})

test('DELETE /semesters/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
