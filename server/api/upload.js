import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData?.length) {
    throw createError({ statusCode: 400, statusMessage: 'No multipart data received' })
  }

  const file = formData.find(f => f.name === 'file')
  if (!file?.filename || !file?.data) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const safeName = file.filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  const fileName = `${Date.now()}-${safeName}`
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  const filePath = join(uploadDir, fileName)

  await mkdir(uploadDir, { recursive: true })
  await writeFile(filePath, file.data)

  return {
    url: `/uploads/${fileName}`
  }
})