declare global {
    type time_type = 'default' | 'no_end' | 'whole_day' | 'tbd'
    type location_type = 'mazemap' | 'coords' | 'address' | 'digital'
    type embed_type = 'on' | 'off'

    // Events
    type Event = {
        visible: boolean
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        informational_no: string | null
        informational_en: string | null
        time_type: time_type
        time_start: string
        time_end: string
        time_publish: string
        time_signup_release: string | null
        time_signup_deadline: string | null
        canceled: boolean
        digital: boolean
        highlight: boolean
        image_small: string | null
        image_banner: string | null
        link_facebook: string | null
        link_discord: string | null
        link_signup: string | null
        link_stream: string | null
        capacity: number | null
        is_full: boolean
    }

    type GetEventProps = Event & {
        id: number
        category: GetCategoryProps
        location: GetLocationProps | null
        parent_id: number | null
        rule: GetRuleProps | null
        audience: GetAudienceProps | null
        organization: GetOrganizationProps | null
        updated_at: string
        created_at: string
    }

    type GetEventsProps = {
        events: GetEventProps[]
        total_count: number
    }

    type GetAllEventsProps = {
        id: number
        name_en: string
        time_start: string
    }[]

    type PostEventProps = Event & {
        category_id: number
        location_id: number | null
        parent_id: number | null
        rule_id: number | null
        audience_id: number | null
        organization_id: number | null
    }

    type PutEventProps = PostEventProps

    // Jobs
    type Job = {
        visible: boolean
        highlight: boolean
        title_no: string
        title_en: string
        cities: string[] | null
        skills: string[] | null
        position_title_no: string
        position_title_en: string
        description_short_no: string
        description_short_en: string
        description_long_no: string
        description_long_en: string
        time_publish: string
        time_expire: string
        banner_image: string | null
        application_url: string | null
    }

    type GetJobProps = Job & {
        id: number
        job_type: GetJobTypeProps
        organization: GetOrganizationProps
        created_at: string
        updated_at: string
    }

    type GetJobsProps = {
        jobs: GetJobProps[]
        total_count: number
    }

    type PostJobProps = Job & {
        job_type_id: number
        organization_id: number
    }

    type PutJobProps = PostJobProps

    // Organizations
    type Organization = {
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        link_homepage: string | null
        link_linkedin: string | null
        link_facebook: string | null
        link_instagram: string | null
        logo: string | null
    }

    type GetOrganizationProps = Organization & {
        id: number
        created_at: string
        updated_at: string
    }

    type GetOrganizationsProps = {
        organizations: GetOrganizationProps[]
        total_count: number
    }

    type GetAllOrganizationsProps = {
        id: number
        name_en: string
        name_no: string
    }[]

    type PostOrganizationProps = Organization
    type PutOrganizationProps = Organization

    // Locations
    type Location = {
        name_no: string
        name_en: string
        type: string
        mazemap_campus_id: number | null
        mazemap_poi_id: number | null
        address_street: string | null
        address_postcode: number | null
        city_name: string | null
        coordinate_lat: number | null
        coordinate_lon: number | null
        url: string | null
    }

    type GetLocationProps = Location & {
        id: number
        created_at: string
        updated_at: string
    }

    type GetLocationsProps = {
        locations: GetLocationProps[]
        total_count: number
    }

    type GetAllLocationsProps = {
        id: number
        name_en: string
        name_no: string
        type: string
    }[]

    type PostLocationProps = Location
    type PutLocationProps = Location

    // Rules
    type Rule = {
        name_no: string
        name_en: string
        description_no: string
        description_en: string
    }

    type GetRuleProps = Rule & {
        id: number
        created_at: string
        updated_at: string
    }

    type GetRulesProps = {
        rules: GetRuleProps[]
        total_count: number
    }

    type GetAllRulesProps = {
        id: number
        name_en: string
    }[]

    type PostRuleProps = Rule
    type PutRuleProps = Rule

    // Audience
    type GetAudienceProps = {
        id: number
        name_no: string
        name_en: string
        created_at: string
        updated_at: string
    }

    type GetAudiencesProps = {
        audiences: GetAudienceProps[]
        total_count: number
    }

    // Categories
    type GetCategoryProps = {
        id: number
        name_no: string
        name_en: string
        color: string
        created_at: string
        updated_at: string
    }

    type GetCategoriesProps = {
        categories: GetCategoryProps[]
        total_count: number
    }

    // Job Type
    type GetJobTypeProps = {
        id: number
        name_no: string
        name_en: string
        updated_at: string
        created_at: string
    }

    type GetJobTypesProps = {
        job_types: GetJobTypeProps[]
        total_count: number
    }

    // Announcements
    type GetAnnouncementProps = {
        id: number
        title: string[]
        description: string[]
        channel: string
        roles: string[]
        embed: boolean
        color: string
        interval: string
        time: string | null
    }

    type PostAnnouncementProps = {
        title: string[]
        description: string[]
        channel: string
        roles: string[]
        embed: boolean
        color: string
        interval: string
        time: string | null
        active: true
    }

    type PostAnnouncementPropsUnparsed = {
        title: string[]
        description: string[]
        channel: string
        roles: string
        embed: boolean
        color: string
        interval: string
        time: string | null
        active: true
    }

    type PutAnnouncementProps = PostAnnouncementProps & {
        id: number
    }

    type PutAnnouncementPropsUnparsed = PostAnnouncementPropsUnparsed & {
        id: number
    }

    type GetAnnouncementsProps = {
        announcements: Announcement[]
        total_count: number
    }

    // Albums
    type AlbumProps = {
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        year: number
    }

    type GetAlbumProps = AlbumProps & {
        id: number
        images: string[]
        event: {
            id: number
            name_en: string
            name_no: string
            time_start: string
            time_end: string
        }
        created_at: string
        updated_at: string
    }

    type GetAlbumsProps = {
        albums: GetAlbumProps[]
        total_count: number
    }

    type PostAlbumProps = AlbumProps & {
        event_id: number
    }

    type PutAlbumProps = AlbumProps & {
        event_id: number
    }

    type ShareURLResponse = {
        url: string
        headers: { [key: string]: string | string[] }
        key: string
    }

    // Alerts
    type AlertProps = {
        service: string
        page: string
        title_en: string
        title_no: string
        description_en: string
        description_no: string
    }

    type GetAlertProps = AlertProps & {
        id: number
        created_at: string
        updated_at: string
    }

    type GetAlertsProps = {
        alerts: GetAlertProps[]
        total_count: number
    }

    type PostAlertProps = AlertProps
    type PutAlertProps = AlertProps

    // Stats
    type GetStatisticsCategoriesProps = {
        id: number
        name_en: string
        event_count: number
        color: string
    }[]

    type GetStatisticsNewAdditionsProps = {
        id: number
        name_en: string
        updated_at: string
        created_at: string
        action: 'created' | 'updated'
        source: string
    }[]

    type GetStatisticsYearlyActivityProps = {
        insert_date: string
        inserted_count: number
    }[]

    // Honeys
    type HoneyProps = {
        service: string
        language: string
        page: string
        text: string
    }

    type GetHoneyProps = HoneyProps & {
        id: number
        created_at: string
        updated_at: string
    }

    type GetHoneyListProps = {
        honeys: GetHoneyProps[]
        total_count: number
    }

    type PostHoneyProps = HoneyProps
    type PutHoneyProps = HoneyProps

    // Enum types
    type GetTypesProps = {
        en: string
        no: string
    }[]

    // Images
    type ImagePaths = 'events' | 'jobs' | 'organizations'

    // ---------------------------------- BeeKeeper -----------------------------------
    // Traffic
    type TrafficMetricsProps = {
        total_requests: number
        avg_request_time: number
        error_rate: number
        top_methods: TrafficMetricProps[]
        top_status_codes: TrafficMetricProps[]
        top_domains: TrafficMetricProps[]
        top_os: TrafficMetricProps[]
        top_browsers: TrafficMetricProps[]
        requests_over_time: TrafficMetricProps[]
        top_error_paths: TrafficMetricProps[]
        top_slow_paths: TrafficMetricsTimeProps[]
        top_paths: TrafficMetricProps[]
    }

    type TrafficMetricProps = {
        key: string
        count: number
    }

    type TrafficMetricsTimeProps = {
        key: string
        avg_time: number
    }

    type TrafficRecordsProps = {
        result: TrafficRecord[]
        total: number
    }

    type TrafficRecord = {
        id: number
        user_agent: string
        domain: string
        path: string
        method: string
        referer: string
        request_time: number
        status: number
        timestamp: string
        country_iso?: string | null
    }

    // ---------------------------------- Backup -----------------------------------

    type BackupProps = {
        id: string
        name: string
        status: string
        lastBackup: string | null
        nextBackup: string
        totalStorage: string
        dbSize: string
        error: string | null
    }

    type GetBackupFilesProps = {
        service?: string
        date?: string
    }

    type BackupFileProps = {
        service?: string
        file?: string
        size?: string
        mtime?: string
        location?: 'local' | 'remote'
    }

    // Other
    type DeleteParamsProps = {
        message: string
    }

    type OptionsProps = { label: string; value: number | string }

    type AudienceProps = {
        audience: number
        event: number
    }

    type EventWithOnlyID = {
        id: string
    }

    type SendResponseClient = {
        status: number
        message: string
    }

    type User = {
        access_token: string
        access_token_expires: string
        refresh_token: string
        refresh_token_expires: string
        user_id: string
        user_name: string
        user_roles: string
    }

    type Application = {
        label: string
        value: job_type
    }

    type LoginImage = {
        label: string
        value: string
        image: string
    }

    type LocationTypes = {
        label: string
        value: location_type
    }

    type Option = { value: string | number; label: string; image?: string }

    type FormName = 'event' | 'job' | 'organization' | 'location' | 'rule' | 'announcement' | 'form' | 'album' | 'alert' | 'honey'

    type Announcement = {
        id: string
        title?: string[]
        description?: string[]
        channel?: string
        roles?: string[]
        embed?: boolean
        color?: string
        interval: boolean
        time: string
        sent: boolean
        last_sent: string
        active: boolean
    }

    type ChannelResponse = {
        guildId: string
        guildName: string
        id: string
        name: string
        category: string
    }

    type Channel = {
        label: string
        value: string
    }

    type RoleResponse = {
        name: string
        id: string
        color: string
    }

    type Role = {
        label: string
        value: string
        color: string
    }

    type DashboardTotalStats = {
        events: number
        jobs: number
        announcements: number
        organizations: number
        locations: number
        albums: number
    }

    type DetailedEvent = {
        id: number | string
        visible: boolean
        name_no: string
        name_en: string
        description_no: string
        description_en: string
        informational_no: string
        informational_en: string
        time_type: string
        time_start: string
        time_end: string
        time_publish: string
        time_signup_release: string
        time_signup_deadline: string
        canceled: boolean
        digital: boolean
        highlight: boolean
        image_small: string
        image_banner: string
        link_facebook: string
        link_discord: string
        link_signup: string
        link_stream: string
        capacity: number | null
        full: boolean
        category: number
        location: null
        parent: null
        rule: null
        updated_at: string
        created_at: string
        deleted_at: string
        category_name_no: string
        category_name_en: string
    }

    type GetIngressProps = {
        port: string
    }

    type Stats = {
        system: {
            load: number[]
            memory: {
                used: number
                total: number
                percent: string
            }
            swap: string
            disk: string
            temperature: string
            powerUsage: string
            processes: number
            ipv4: string[]
            ipv6: string[]
            os: string
        }
    }

    type Docker = {
        status: 'available' | 'unavailable'
        count: number
        containers: Container[]
        error?: string | null
    }

    type DeploymentStatus = {
        id: string
        name: string
        repoPath: string
        branch: string
        serviceUnit: string
        timerUnit: string
        unitScope: 'user' | 'system' | 'none'
        autoDeployEnabled: boolean
        autoDeployActive: boolean
        serviceActive: boolean
        updateAvailable: boolean
        behindCount: number
        currentCommit: string | null
        upstreamCommit: string | null
        dirty: boolean
        reachable: boolean
        activeState: string
        subState: string
        lastResult: string | null
        lastDeploymentAt: string | null
        lastAutoDeployAt: string | null
        error: string | null
    }

    type Container = {
        id: string
        name: string
        status: string
        project: string
        deployment: DeploymentStatus | null
    }

    type ServiceProps = {
        service: ServiceAsList
        segmentedPathname: string[]
        context: string
    }

    type Editing = {
        cards: Card[]
        texts: string[]
    }

    type ServiceAsList = {
        context: string
        name: string
        status: string
        service_status: 'operational' | 'degraded' | 'down'
        age: string
    }

    type Card = {
        question: string
        alternatives: string[]
        source: string
        correct: number[]
        help?: string
        theme?: string
        rating: number
        votes: Vote[]
    }

    type CardAsText = {
        input: string
    }

    type Vote = {
        username: string
        vote: boolean
    }

    type Files = {
        name: string
        content: string
        files: Files[]
        parent?: string
    }

    type FileListProps = {
        files: Files[]
        path: string
        inputRef: RefObject<HTMLInputElement | null>
    }

    type ClientVote = {
        commentID: number
        vote: boolean
        isReply?: true
    }

    type RegisterUser = {
        id: string
        name: string
        username: string
    }

    type LocalLog = {
        context: string
        namespace: string
        id: string
        name: string
        event: string
        status: ServiceStatus
        command: string
        timestamp: string
    }

    type GlobalLog = {
        id: string
        name: string
        event: string
        status: string
        command: string
        timestamp: string
    }

    type Context = {
        name: string
        cluster: string
        authinfo: string
        namespace: string
    }

    type GlobalCommand = {
        id: string
        name: string
        command: string
        author: string
        reason: string
        timestamp: string
    }

    type LocalCommand = {
        id: string
        context: string
        name: string
        namespace: string
        command: string
        author: string
        reason: string
        timestamp: string
    }

    type GlobalCommandWithUser = {
        id: string
        name: string
        command: string
        author: User
        reason: string
        timestamp: string
    }

    type LocalCommandWithUser = {
        id: string
        context: string
        name: string
        namespace: string
        command: string
        author: User
        reason: string
        timestamp: string
    }

    type Incident = {
        id: string
        name: string
        url: string
        context: string
        namespace: string
        timestamp: string
    }

    type Domain = {
        id: string
        name: string
        url: string
        context: string
        namespace: string
    }

    type DomainWithoutID = {
        name: string
        url: string
        context: string
        namespace: string
    }

    type IncidentWithoutID = {
        name: string
        url: string
        timestamp: string
        context: string
        namespace: string
    }

    type DomainsWithStatus = {
        id: string
        name: string
        url: string
        context: string
        namespace: string
        status: number
    }

    type Message = {
        id: string
        title: string
        author: string
        status: string
        content: string
        timestamp: string
    }

    type BaseMessage = {
        title: string
        author: string
        status: string
        content: string
    }

    type MessageWithoutTimestamp = {
        id: string
        title: string
        author: string
        status: string
        content: string
    }

    type Pod = {
        name: string
        ready: string
        status: string
        restarts: string
        age: string
        context: string
        namespace: string
        timestamp: string
    }

    type Ingress = {
        id: string
        context: string
        namespace: string
        name: string
        class: string
        hosts: string
        address: string
        ports: string
        age: string
    }

    type Result = {
        status: number
        message: string
    }

    type Service = {
        id: number
        uptime: number
        name: string
        enabled: boolean
        notification: number | null
        notificationPolicy?: ServiceNotification | null
        maxConsecutiveFailures: number
        port: number | null
        tags: { id: number; name: string }[]
        bars: Bar[]
        certificate?: Certificate | InvalidCertificate
    }

    type Bar = {
        status: boolean
        delay: number
        expectedDown: boolean
        timestamp: string
        note: string
    }

    type ServiceNotification = {
        id: number
        name: string
        message: string
        webhook: string
    }

    type Tag = {
        id: string
        name: string
        color: string
    }

    type NewService = {
        name: string
        type: MonitoredServiceType
        url: string
        port: number
        interval: number
        userAgent: null | string
        notification: null | string
        expectedDown: boolean
        upsideDown: boolean
        maxConsecutiveFailures: number
        note: string
        enabled: boolean
    }

    type DetailedService = {
        id: number
        uptime: number
        type: string
        name: string
        enabled: boolean
        notification: number | null
        notificationPolicy?: ServiceNotification | null
        port: number | null
        tags: { id: number; name: string }[]
        bars: Bar[]
        url: string
        userAgent: string | null
        expectedDown: boolean
        upsideDown: boolean
        interval: number
        note: string
        maxConsecutiveFailures: number
        certificate?: Certificate | InvalidCertificate
    }

    type MonitoredServiceType = 'fetch' | 'post' | 'tcp'

    type Certificate = {
        valid: true
        subjectCN: string
        issuer: {
            cn: string
            name: string
        }
        validFrom: string
        validTo: string
        keyType: string
        signatureAlgorithm: string | undefined
        publicKeyAlgorithm: string
        dnsNames: string
        raw: {
            subject: object
            issuer: object
            subjectaltname: string
            infoAccess: object
            ca: boolean
            modulus: unknown | undefined
            exponent: unknown | undefined
            pubkey: Buffer
            bits: number
            valid_from: string
            valid_to: string
            fingerprint: string
            fingerprint256: string
            fingerprint512: string
            ext_key_usage: unknown[]
            serialNumber: string
            raw: Buffer
            asn1Curve: string
            nistCurve: string
            issuerCertificate: object[]
        }
    }

    type InvalidCertificate = {
        valid: false
        message: string
        reason?: string
        code?: string
        service: string
    }

    type Entry = { key: string; count?: number; avg_time?: number }

    type GetParamsProps = {
        type?: string
        search?: string
        offset?: number
        limit?: number
        orderBy?: string
        sort?: 'asc' | 'desc'
        historical?: boolean
    }

    type InternalDashboard = {
        statistics: InternalDashboardStatistics
        information: InternalDashboardInformation
        runtime: InternalDashboardRuntime
    }

    type InternalDashboardStatistics = {
        alerts: number
        databases: number
        monitored: number
        requestsToday: number
    }

    type InternalDashboardInformation = {
        system: {
            ram: string
            processes: number
            disk: string
            load: string
            containers: number
        }
    }

    type InternalDashboardRuntime = {
        metrics: Stats
        docker: Docker
        databaseOverview: GetDatabaseOverview | null
    }

    type DatabaseOverviewQuery = {
        database: string
        user: string | null
        application: string | null
        ageSeconds: number
        waitEventType: string | null
        query: string
    }

    type DatabaseOverviewAverageQuery = {
        lastMinute: number | null
        lastFiveMinutes: number | null
        lastHour: number | null
        lastDay: number | null
    }

    type DatabaseOverviewTable = {
        schema: string
        name: string
        estimatedRows: number
        tableBytes: number
        indexBytes: number
        totalBytes: number
    }

    type DatabaseOverviewItem = {
        name: string
        sizeBytes: number
        tableCount: number
        activeQueries: number
        currentConnections: number
        longestQuerySeconds: number | null
        averageQuerySeconds: DatabaseOverviewAverageQuery
        largestTable: string | null
        tables: DatabaseOverviewTable[]
    }

    type DatabaseOverviewCluster = {
        id: string
        name: string
        project: string
        status: string
        databaseCount: number
        totalSizeBytes: number
        activeQueries: number
        currentConnections: number
        longestQuery: DatabaseOverviewQuery | null
        averageQuerySeconds: DatabaseOverviewAverageQuery
        databases: DatabaseOverviewItem[]
        error: string | null
    }

    type GetDatabaseOverview = {
        generatedAt: string
        clusterCount: number
        databaseCount: number
        totalSizeBytes: number
        activeQueries: number
        longestQuery: DatabaseOverviewQuery | null
        averageQuerySeconds: DatabaseOverviewAverageQuery
        clusters: DatabaseOverviewCluster[]
    }

    type AppNotificationHistoryEntry = {
        id: string
        title: string
        body: string
        topic: string
        data: Record<string, string>
        sentAt: string
        delivered: number
        failed: number
        ticketIds: string[]
    }

    type ScheduledAppNotificationEntry = {
        id: string
        title: string
        body: string
        topic: string
        data: Record<string, string>
        scheduledAt: string
        status: 'scheduled' | 'processing' | 'sent' | 'failed' | 'cancelled'
        createdAt: string
        updatedAt: string
        sentAt: string | null
        cancelledAt: string | null
        lastError: string | null
        delivered: number | null
        failed: number | null
        historyId: string | null
        createdBy: string | null
    }
}

export {}
