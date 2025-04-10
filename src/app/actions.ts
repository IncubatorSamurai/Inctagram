'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPost(id: string) {
  revalidatePath('/settings') // Update cached posts
  redirect(`/settings/${id}`) // Navigate to the new post page
}
