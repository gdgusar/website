import {NextResponse} from 'next/server'
import client from '../../../utils/sanityClient'
import {createClient} from 'next-sanity'

const query = `*[_type == "teamMember"] | order(joinedgdgusar asc, startYear asc) {
  _id,
  name,
  designation,
  branch,
  chapterName,
  startYear,
  endYear,
  joinedgdgusar,
  "imageUrl": image.asset->url,
  linkedin,
  github
}[0...10]`

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const includeDrafts = url.searchParams.get('drafts') === '1'
    const token = process.env.SANITY_API_READ_TOKEN

    let activeClient = client

    if (includeDrafts && token) {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k9r7o650'
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
      activeClient = createClient({
        projectId,
        dataset,
        apiVersion: '2022-03-07',
        useCdn: false,
        token,
        perspective: 'previewDrafts',
      } as any)
    }

    const data = await activeClient.fetch(query)
    return NextResponse.json({ ok: true, count: data?.length || 0, data, drafts: includeDrafts && !!token })
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
