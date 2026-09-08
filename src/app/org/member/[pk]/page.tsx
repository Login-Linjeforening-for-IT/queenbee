import { notFound } from 'next/navigation'
import config from '@config'
import { getMemberProfile } from '@utils/api/authentik/members'
import MemberProfile from '@components/directory/memberProfile'
import MembershipPanel from '@components/directory/membershipPanel'

export const metadata = {
    title: 'Member · QueenBee',
}

export default async function Page({ params }: { params: Promise<{ pk: string }> }) {
    const { pk } = await params
    const profile = await getMemberProfile(pk)

    if (!profile) notFound()

    return (
        <div className='flex flex-col gap-6'>
            <MemberProfile profile={profile} authentikUrl={config.url.authentik} />
            {!profile.isService && (
                <MembershipPanel pk={profile.pk} name={profile.name} groups={profile.groups} />
            )}
        </div>
    )
}
