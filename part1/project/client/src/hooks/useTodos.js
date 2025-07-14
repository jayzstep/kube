import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const getTodos = async () => {
  const response = await axios.get('/api/todos')
  return response.data
}

const addTodo = async todoData => {
  const response = await axios.post('/api/todos', { data: todoData })
  return response.data
}

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  })
}

export const useAddTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}

