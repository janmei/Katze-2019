import { Program } from '.'

let program

beforeEach(async () => {
  program = await Program.create({ title: 'test', time: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = program.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(program.id)
    expect(view.title).toBe(program.title)
    expect(view.time).toBe(program.time)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = program.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(program.id)
    expect(view.title).toBe(program.title)
    expect(view.time).toBe(program.time)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
