'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  Button,
  Input 
} from '@/shared/components'
import { transliterate } from '@/shared/utils'
import { 
  createProjectSchema, 
  type CreateProjectData, 
  type ProjectCreateModalProps,
  DEFAULT_CREATE_PROJECT_VALUES
} from '../model'

export function ProjectCreateModal({ 
  isOpen, 
  onClose,
  onSubmit, 
  isLoading 
}: ProjectCreateModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<CreateProjectData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: DEFAULT_CREATE_PROJECT_VALUES
  })

  const watchedDisplayName = watch('displayName')

  // Автоматическая транслитерация displayName в name
  useEffect(() => {
    if (watchedDisplayName) {
      const transliteratedName = transliterate(watchedDisplayName)
      setValue('name', transliteratedName)
    }
  }, [watchedDisplayName, setValue])

  const handleClose = () => {
    // Очищаем форму при закрытии
    reset()
    onClose()
  }

  const handleFormSubmit = async (data: CreateProjectData) => {
    await onSubmit(data)
    handleClose()
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Разрешаем только латиницу, цифры и дефисы
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setValue('name', value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Создать новый проект</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <Input
              type="text"
              label="Название проекта"
              placeholder="Введите название проекта"
              {...register("displayName")}
              error={errors.displayName?.message}
            />

            <Input
              type="text"
              label="Имя проекта"
              description="Будет использоваться в URL проекта"
              placeholder="project-name"
              prefix="profound.com/"
              {...register("name")}
              onChange={handleNameChange}
              maxLength={30}
              showCounter={true}
              error={errors.name?.message}
            />

          <DialogFooter>
            <Button
              type="submit"
              theme="primary"
              size="l"
              fluid
              isLoading={isLoading}
            >
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
