import { View } from '.'

let view

beforeEach(async () => {
  view = await View.create({ content: 'test', animation: 'test', name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = view.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(view.id)
    expect(view.content).toBe(view.content)
    expect(view.animation).toBe(view.animation)
    expect(view.name).toBe(view.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = view.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(view.id)
    expect(view.content).toBe(view.content)
    expect(view.animation).toBe(view.animation)
    expect(view.name).toBe(view.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
