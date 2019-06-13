import { Team } from '.'

let team

beforeEach(async () => {
  team = await Team.create({ persons: 'test', abstract: 'test', name: 'test', image: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = team.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(team.id)
    expect(view.persons).toBe(team.persons)
    expect(view.abstract).toBe(team.abstract)
    expect(view.name).toBe(team.name)
    expect(view.image).toBe(team.image)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = team.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(team.id)
    expect(view.persons).toBe(team.persons)
    expect(view.abstract).toBe(team.abstract)
    expect(view.name).toBe(team.name)
    expect(view.image).toBe(team.image)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
