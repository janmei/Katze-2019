import { Semester } from '.'

let semester

beforeEach(async () => {
  semester = await Semester.create({ year: 'test', title: 'test', teams: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = semester.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(semester.id)
    expect(view.year).toBe(semester.year)
    expect(view.title).toBe(semester.title)
    expect(view.teams).toBe(semester.teams)
    expect(view.description).toBe(semester.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = semester.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(semester.id)
    expect(view.year).toBe(semester.year)
    expect(view.title).toBe(semester.title)
    expect(view.teams).toBe(semester.teams)
    expect(view.description).toBe(semester.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
