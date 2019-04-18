import { Elective } from '.'

let elective

beforeEach(async () => {
  elective = await Elective.create({ name: 'test', prof: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = elective.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(elective.id)
    expect(view.name).toBe(elective.name)
    expect(view.prof).toBe(elective.prof)
    expect(view.description).toBe(elective.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = elective.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(elective.id)
    expect(view.name).toBe(elective.name)
    expect(view.prof).toBe(elective.prof)
    expect(view.description).toBe(elective.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
