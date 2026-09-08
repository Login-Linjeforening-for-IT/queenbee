import getMemberReport from '@utils/api/authentik/getMemberReport'
import Report from '@components/report/report'

export const metadata = {
    title: 'Member Report · QueenBee',
}

export default async function Page() {
    const report = await getMemberReport()

    return <Report report={report} />
}
