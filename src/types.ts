import type { CollectionEntry } from 'astro:content'

export type PostCollectionEntry = CollectionEntry<'essay'> | CollectionEntry<'manual'>
