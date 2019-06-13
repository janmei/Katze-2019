import { Day } from '.'

let day

beforeEach(async () => {
  day = await Day.create({ program: 'test', date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = day.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(day.id)
    expect(view.program).toBe(day.program)
    expect(view.date).toBe(day.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = day.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(day.id)
    expect(view.program).toBe(day.program)
    expect(view.date).toBe(day.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
