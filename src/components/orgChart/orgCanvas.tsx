'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Crown, Maximize, Minus, Plus, X } from 'lucide-react'
import { Badge } from 'uibee/components'
import type { OrgChart, OrgMember, OrgUnit } from '@utils/api/authentik/getOrgChart'

const CARD_W = 252
const HEADER_H = 48
const ROW_H = 30
const PAD_V = 24
const V_GAP = 150
const H_PITCH = 300
const PAD = 500

type Tier = 'board' | 'committee' | 'fondet' | 'hr'

type Node = {
    key: string
    unit: OrgUnit
    tier: Tier
    x: number
    y: number
    w: number
    h: number
}

type Edge = { from: string, to: string }

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const clampScale = (s: number) => clamp(s, 0.2, 2.4)

function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase())
        .join('') || '?'
}

function cardHeight(unit: OrgUnit) {
    return PAD_V + HEADER_H + Math.max(1, unit.members.length) * ROW_H
}

function useLayout(chart: OrgChart) {
    return useMemo(() => {
        const nodes: Node[] = []
        const edges: Edge[] = []
        const spineX = 0

        const push = (unit: OrgUnit, tier: Tier, x: number, y: number): Node => {
            const node: Node = { key: unit.name, unit, tier, x, y, w: CARD_W, h: cardHeight(unit) }
            nodes.push(node)
            return node
        }

        const boardNode = push(chart.board, 'board', spineX - CARD_W / 2, 0)
        push(chart.hr, 'hr', spineX - CARD_W / 2 - CARD_W - 120, 0)
        push(chart.fondet, 'fondet', spineX + CARD_W / 2 + 120, 0)

        const total = chart.committees.length * H_PITCH - (H_PITCH - CARD_W)
        const startX = spineX - total / 2
        const commY = boardNode.y + boardNode.h + V_GAP
        chart.committees.forEach((unit, index) => {
            const node = push(unit, 'committee', startX + index * H_PITCH, commY)
            edges.push({ from: boardNode.key, to: node.key })
        })

        const minX = Math.min(...nodes.map(n => n.x))
        const minY = Math.min(...nodes.map(n => n.y))
        const maxX = Math.max(...nodes.map(n => n.x + n.w))
        const maxY = Math.max(...nodes.map(n => n.y + n.h))

        const ox = -minX + PAD
        const oy = -minY + PAD
        const worldW = maxX - minX + PAD * 2
        const worldH = maxY - minY + PAD * 2

        return { nodes, edges, bounds: { minX, minY, maxX, maxY }, ox, oy, worldW, worldH }
    }, [chart])
}

type View = { scale: number, x: number, y: number }

export default function OrgCanvas({ chart, className = '' }: {
    chart: OrgChart
    className?: string
}) {
    const { nodes, edges, bounds, ox, oy, worldW, worldH } = useLayout(chart)
    const nodeByKey = useMemo(() => new Map(nodes.map(node => [node.key, node])), [nodes])
    const viewportRef = useRef<HTMLDivElement>(null)
    const drag = useRef({ active: false, moved: false, sx: 0, sy: 0, vx: 0, vy: 0 })
    const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 })
    const [selected, setSelected] = useState<string | null>(null)

    const fit = useCallback(() => {
        const vp = viewportRef.current
        if (!vp) return
        const vw = vp.clientWidth
        const vh = vp.clientHeight
        const cw = bounds.maxX - bounds.minX
        const ch = bounds.maxY - bounds.minY
        const scale = clampScale(Math.min(vw / (cw + 160), vh / (ch + 160)))
        const cx = ox + bounds.minX + cw / 2
        const cy = oy + bounds.minY + ch / 2
        setView({ scale, x: vw / 2 - cx * scale, y: vh / 2 - cy * scale })
    }, [bounds, ox, oy])

    useLayoutEffect(() => { fit() }, [fit])

    useEffect(() => {
        const vp = viewportRef.current
        if (!vp || typeof ResizeObserver === 'undefined') return
        const observer = new ResizeObserver(() => fit())
        observer.observe(vp)
        return () => observer.disconnect()
    }, [fit])

    useEffect(() => {
        const vp = viewportRef.current
        if (!vp) return
        const onWheel = (event: WheelEvent) => {
            event.preventDefault()
            const rect = vp.getBoundingClientRect()
            const px = event.clientX - rect.left
            const py = event.clientY - rect.top
            setView(current => {
                const scale = clampScale(current.scale * Math.exp(-event.deltaY * 0.0015))
                const ratio = scale / current.scale
                return { scale, x: px - (px - current.x) * ratio, y: py - (py - current.y) * ratio }
            })
        }
        vp.addEventListener('wheel', onWheel, { passive: false })
        return () => vp.removeEventListener('wheel', onWheel)
    }, [])

    const zoomBy = useCallback((factor: number) => {
        const vp = viewportRef.current
        if (!vp) return
        const px = vp.clientWidth / 2
        const py = vp.clientHeight / 2
        setView(current => {
            const scale = clampScale(current.scale * factor)
            const ratio = scale / current.scale
            return { scale, x: px - (px - current.x) * ratio, y: py - (py - current.y) * ratio }
        })
    }, [])

    const onPointerDown = (event: React.PointerEvent) => {
        if (event.button !== 0) return
        drag.current = { active: true, moved: false, sx: event.clientX, sy: event.clientY, vx: view.x, vy: view.y }
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: React.PointerEvent) => {
        if (!drag.current.active) return
        const dx = event.clientX - drag.current.sx
        const dy = event.clientY - drag.current.sy
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.current.moved = true
        setView(current => ({ ...current, x: drag.current.vx + dx, y: drag.current.vy + dy }))
    }

    const onPointerUp = () => { drag.current.active = false }

    const selectedNode = selected ? nodeByKey.get(selected) ?? null : null

    return (
        <div className={`relative overflow-hidden rounded-xl border border-login-500/30 bg-login-950 ${className}`}>
            <div
                ref={viewportRef}
                className='h-full w-full cursor-grab select-none active:cursor-grabbing'
                style={{ touchAction: 'none' }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onClick={() => { if (!drag.current.moved) setSelected(null) }}
            >
                <div
                    className='absolute left-0 top-0 origin-top-left'
                    style={{
                        width: worldW,
                        height: worldH,
                        transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                >
                    <Edges edges={edges} nodeByKey={nodeByKey} ox={ox} oy={oy} worldW={worldW} worldH={worldH} selected={selected} />
                    {nodes.map(node => (
                        <NodeCard
                            key={node.key}
                            node={node}
                            left={node.x + ox}
                            top={node.y + oy}
                            selected={selected === node.key}
                            crownSet={new Set(node.unit.leaderPks)}
                            onSelect={() => { if (!drag.current.moved) setSelected(node.key) }}
                        />
                    ))}
                </div>
            </div>

            <div className={`
                pointer-events-none absolute left-3 top-3 rounded-md border border-login-500/30
                bg-login-950/70 px-2.5 py-1 text-xs text-login-200 backdrop-blur
            `}>
                Drag to pan, scroll to zoom
            </div>

            <div className={`
                absolute bottom-3 right-3 flex flex-col overflow-hidden
                rounded-lg border border-login-500/30 bg-login-900/90 backdrop-blur
            `}>
                <ControlButton label='Zoom in' onClick={() => zoomBy(1.2)}><Plus className='h-4 w-4' /></ControlButton>
                <div className='px-2 py-1 text-center text-[10px] tabular-nums text-login-200'>{Math.round(view.scale * 100)}%</div>
                <ControlButton label='Zoom out' onClick={() => zoomBy(1 / 1.2)}><Minus className='h-4 w-4' /></ControlButton>
                <div className='h-px bg-white/5' />
                <ControlButton label='Fit to screen' onClick={fit}><Maximize className='h-4 w-4' /></ControlButton>
            </div>

            {selectedNode && (
                <MemberPanel
                    node={selectedNode}
                    crownSet={new Set(selectedNode.unit.leaderPks)}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    )
}

function ControlButton({ label, onClick, children }: { label: string, onClick: () => void, children: React.ReactNode }) {
    return (
        <button
            type='button'
            title={label}
            aria-label={label}
            onClick={onClick}
            className='flex h-9 w-9 items-center justify-center text-login-100 transition-colors hover:bg-login-500 hover:text-login'
        >
            {children}
        </button>
    )
}

type EdgesProps = {
    edges: Edge[]
    nodeByKey: Map<string, Node>
    ox: number
    oy: number
    worldW: number
    worldH: number
    selected: string | null
}

function Edges({ edges, nodeByKey, ox, oy, worldW, worldH, selected }: EdgesProps) {
    return (
        <svg className='pointer-events-none absolute left-0 top-0' width={worldW} height={worldH}>
            <defs>
                <marker id='arrow' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'>
                    <path d='M 0 0 L 10 5 L 0 10 z' fill='#5e5e5e' />
                </marker>
                <marker
                    id='arrow-active' viewBox='0 0 10 10' refX='8' refY='5'
                    markerWidth='6' markerHeight='6' orient='auto-start-reverse'
                >
                    <path d='M 0 0 L 10 5 L 0 10 z' fill='#fd8738' />
                </marker>
            </defs>
            {edges.map(edge => {
                const source = nodeByKey.get(edge.from)
                const target = nodeByKey.get(edge.to)
                if (!source || !target) return null
                const active = selected === edge.from || selected === edge.to
                const stroke = active ? '#fd8738' : '#4a4a4a'
                const marker = active ? 'url(#arrow-active)' : 'url(#arrow)'

                const x1 = source.x + source.w / 2 + ox
                const y1 = source.y + source.h + oy
                const x2 = target.x + target.w / 2 + ox
                const y2 = target.y + oy
                const my = (y1 + y2) / 2
                return (
                    <path
                        key={`${edge.from}-${edge.to}`}
                        d={`M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`}
                        fill='none'
                        stroke={stroke}
                        strokeWidth={active ? 2.5 : 1.5}
                        markerEnd={marker}
                    />
                )
            })}
        </svg>
    )
}

const TIER_LABEL: Record<Tier, string> = {
    board: 'Board',
    committee: 'Committee',
    fondet: 'Fund',
    hr: 'HR',
}

const NAME_TRANSLATIONS: Record<string, string> = {
    Styret: 'Board',
    Leder: 'Leader',
    Nestleder: 'Deputy',
}

const displayName = (name: string) => NAME_TRANSLATIONS[name] ?? name

function NodeCard({ node, left, top, selected, crownSet, onSelect }: {
    node: Node
    left: number
    top: number
    selected: boolean
    crownSet: Set<number>
    onSelect: () => void
}) {
    const { unit, tier } = node
    const isBoard = tier === 'board'
    const title = displayName(unit.name)
    const label = TIER_LABEL[tier]

    const border = selected
        ? 'border-login ring-2 ring-login/60'
        : tier === 'committee'
            ? 'border-login-500/30'
            : 'border-login/30'

    return (
        <div
            role='button'
            tabIndex={0}
            onClick={event => { event.stopPropagation(); onSelect() }}
            onKeyDown={event => { if (event.key === 'Enter') onSelect() }}
            className={`
                absolute flex flex-col gap-2 overflow-hidden rounded-xl border p-3 text-left
                shadow-lg shadow-black/20 transition-colors
                ${tier === 'committee' ? 'bg-login-500/40' : 'bg-login-500/60'} ${border}
                hover:border-login/60
            `}
            style={{ left, top, width: node.w, height: node.h }}
        >
            <div className='flex items-start justify-between gap-2'>
                <div className='flex flex-col'>
                    {label !== title && (
                        <span className='text-[10px] font-semibold uppercase tracking-wider text-login'>{label}</span>
                    )}
                    <span className={`font-semibold leading-tight text-login-50 ${isBoard ? 'text-base' : ''}`}>{title}</span>
                </div>
                <Badge text={String(unit.members.length)} variant='orange' />
            </div>

            {unit.members.length === 0 ? (
                <span className='text-xs text-login-300'>No active members</span>
            ) : (
                <div className='flex flex-col'>
                    {unit.members.map(member => (
                        <MemberRow key={member.pk} member={member} crowned={crownSet.has(member.pk)} />
                    ))}
                </div>
            )}
        </div>
    )
}

function MemberRow({ member, crowned }: { member: OrgMember, crowned: boolean }) {
    return (
        <div className='flex items-center gap-2' style={{ height: ROW_H }}>
            <span className={`
                flex h-6 w-6 min-w-6 items-center justify-center rounded-full text-[9px] font-medium
                ${crowned ? 'bg-login/20 text-login' : 'bg-login-600 text-login-100'}
            `}>
                {initials(member.name)}
            </span>
            <span className='truncate text-sm text-login-50' title={member.email || member.username}>{member.name}</span>
            {crowned && <Crown className='ml-auto h-3.5 w-3.5 shrink-0 text-login' fill='currentColor' />}
        </div>
    )
}

function MemberPanel({ node, crownSet, onClose }: {
    node: Node
    crownSet: Set<number>
    onClose: () => void
}) {
    const members = node.unit.members
    const title = displayName(node.unit.name)
    const label = TIER_LABEL[node.tier]
    return (
        <div className={`
            absolute bottom-3 right-14 top-3 flex w-72 flex-col
            rounded-xl border border-login-500/30 bg-login-900/95 backdrop-blur
        `}>
            <div className='flex items-start justify-between gap-2 border-b border-white/5 p-3'>
                <div className='flex flex-col'>
                    {label !== title && (
                        <span className='text-[10px] font-semibold uppercase tracking-wider text-login'>{label}</span>
                    )}
                    <span className='font-semibold text-login-50'>{title}</span>
                    <span className='text-xs text-login-300'>{node.unit.members.length} active members</span>
                </div>
                <button
                    type='button'
                    aria-label='Close'
                    onClick={onClose}
                    className='rounded-md p-1 text-login-200 transition-colors hover:bg-login-500 hover:text-login-50'
                >
                    <X className='h-4 w-4' />
                </button>
            </div>
            <div className='flex flex-col gap-1 overflow-y-auto p-2'>
                {members.length === 0 && <span className='p-2 text-sm text-login-300'>No active members.</span>}
                {members.map(member => (
                    <Link
                        key={member.pk}
                        href={`/org/member/${member.pk}`}
                        className='group flex items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-login-500'
                    >
                        <span className={`
                            flex h-7 w-7 min-w-7 items-center justify-center rounded-full text-[10px] font-medium
                            ${crownSet.has(member.pk) ? 'bg-login/20 text-login' : 'bg-login-600 text-login-100'}
                        `}>
                            {initials(member.name)}
                        </span>
                        <div className='flex min-w-0 flex-col'>
                            <span className='flex items-center gap-1 truncate text-sm text-login-50'>
                                {member.name}
                                {crownSet.has(member.pk) && <Crown className='h-3 w-3 shrink-0 text-login' fill='currentColor' />}
                            </span>
                            <span className='truncate text-xs text-login-300'>{member.email || member.username}</span>
                        </div>
                        <ChevronRight className='ml-auto h-3.5 w-3.5 shrink-0 text-login-300 group-hover:text-login-100' />
                    </Link>
                ))}
            </div>
        </div>
    )
}
