import {NextResponse} from 'next/server'
import client from '../../../utils/sanityClient'

export async function GET() {
  try {
    const countQuery = 'count(*[_type == "teamMember"])'
    const sampleQuery = '*[_type == "teamMember"][0...3]{_id, name, designation}'

    const [count, sample] = await Promise.all([
      client.fetch<number>(countQuery),
      client.fetch<Array<{_id: string; name?: string; designation?: string}>>(sampleQuery),
    ])

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k9r7o650'
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

    return NextResponse.json({
      ok: true,
      projectId,
      dataset,
      count,
      sample,
    })
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
