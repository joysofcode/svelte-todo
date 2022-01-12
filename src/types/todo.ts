export interface ITodo {
  id: string
  text: string
  completed: boolean
}

export type FiltersType = 'all' | 'active' | 'completed'
