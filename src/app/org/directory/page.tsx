import { getMemberDirectory } from '@utils/api/authentik/members'
import MemberDirectory from '@components/directory/memberDirectory'

export const metadata = {
    title: 'Member Directory · QueenBee',
}

export default async function Page() {
    const members = await getMemberDirectory()

    return <MemberDirectory members={members} />
}
