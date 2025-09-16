'use client'

import { useState, useEffect } from 'react'
import { useQueryState } from 'nuqs'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  Button,
  Input 
} from '@/shared/components'
import { useCreateProject, CreateProjectData } from '@/entities/project'
import { transliterate } from '@/shared/utils'

export default function CreateProjectModal() {
  const createProject = useCreateProject()
  const [createParam, setCreateParam] = useQueryState('create')
  
  const [formData, setFormData] = useState<CreateProjectData>({
    displayName: '',
    name: ''
  })
  const [error, setError] = useState<string | null>(null)

  // Управление открытием модального окна через query параметр
  const isOpen = createParam === 'project'

  // Автоматическая транслитерация displayName в name
  useEffect(() => {
    if (formData.displayName) {
      const transliteratedName = transliterate(formData.displayName)
      setFormData(prev => ({ ...prev, name: transliteratedName }))
    }
  }, [formData.displayName])

  const handleClose = () => {
    // Убираем query параметр из URL
    setCreateParam(null)
    
    // Очищаем форму
    setFormData({ displayName: '', name: '' })
    setError(null)
  }

  const handleSubmit = async () => {
    if (!formData.displayName.trim()) {
      setError('Введите название проекта')
      return
    }
    
    if (!formData.name.trim()) {
      setError('Введите имя проекта')
      return
    }

    setError(null)

    try {
      await createProject.mutateAsync(formData)
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании проекта')
    }
  }

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, displayName: e.target.value }))
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Разрешаем только латиницу, цифры и дефисы
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setFormData(prev => ({ ...prev, name: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Создать новый проект</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Название проекта
            </label>
            <Input
              type="text"
              placeholder="Введите название проекта"
              value={formData.displayName}
              onChange={handleDisplayNameChange}
              maxLength={50}
              showCounter={true}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Имя проекта (URL)
            </label>
            <Input
              type="text"
              placeholder="project-name"
              prefix="profound.com/"
              value={formData.name}
              onChange={handleNameChange}
              maxLength={30}
              showCounter={true}
            />
            <p className="text-xs text-gray-500">
              Будет использоваться в URL проекта
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={createProject.isPending}
          >
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createProject.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {createProject.isPending ? 'Создание...' : 'Создать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
