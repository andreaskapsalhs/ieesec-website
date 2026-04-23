'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export interface BlobCursorProps {
    blobType?: 'circle' | 'square';
    fillColor?: string;
    trailCount?: number;
    sizes?: number[];
    innerSizes?: number[];
    innerColor?: string;
    opacities?: number[];
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    filterId?: string;
    filterStdDeviation?: number;
    filterColorMatrixValues?: string;
    useFilter?: boolean;
    fastDuration?: number;
    slowDuration?: number;
    fastEase?: string;
    slowEase?: string;
    zIndex?: number;
    children?: React.ReactNode;
}

export default function BlobCursor({
                                       blobType = 'circle',
                                       fillColor="#FFFFFF",
                                       trailCount = 3,
                                       sizes = [60, 125, 75],
                                       innerSizes = [20, 35, 25],
                                       innerColor = 'rgba(255,255,255,0.8)',
                                       opacities = [0.6, 0.6, 0.6],
                                       shadowColor = 'rgba(0,0,0,0.75)',
                                       shadowBlur = 5,
                                       shadowOffsetX = 10,
                                       shadowOffsetY = 10,
                                       filterId = 'blob',
                                       filterStdDeviation = 30,
                                       filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
                                       useFilter = true,
                                       fastDuration = 0.1,
                                       slowDuration = 0.5,
                                       fastEase = 'power3.out',
                                       slowEase = 'power1.out',
                                       zIndex = 0,
                                       children
                                   }: BlobCursorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

    const handleMove = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            // Get mouse position relative to the browser window
            const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
            const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

            blobsRef.current.forEach((el, i) => {
                if (!el) return;
                const isLead = i === 0;
                gsap.to(el, {
                    x, // No more math subtracting rect.left/top
                    y,
                    duration: isLead ? fastDuration : slowDuration,
                    ease: isLead ? fastEase : slowEase,
                    overwrite: 'auto'
                });
            });
        },
        [fastDuration, slowDuration, fastEase, slowEase]
    );

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            className="relative w-full min-h-screen bg-transparent"
            style={{ zIndex }}
        >
            {/* Layer 1: The Blobs (Background) */}
            <div
                className="pointer-events-none fixed inset-0 overflow-hidden"
                style={{ filter: useFilter ? `url(#${filterId})` : undefined, zIndex: -1 }}
            >
                {useFilter && (
                    <svg className="absolute w-0 h-0">
                        <filter id={filterId}>
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
                            <feColorMatrix in="blur" values={filterColorMatrixValues} />
                        </filter>
                    </svg>
                )}

                {Array.from({ length: trailCount }).map((_, i) => (
                    <div
                        key={i}
                        ref={el => { blobsRef.current[i] = el; }}
                        className="absolute left-0 top-0 will-change-transform transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                            width: sizes[i] ?? 60,
                            height: sizes[i] ?? 60,
                            borderRadius: blobType === 'circle' ? '50%' : '0',
                            backgroundColor: fillColor,
                            opacity: opacities[i] ?? 0.6,
                            boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
                        }}
                    >
                        <div
                            className="absolute"
                            style={{
                                width: innerSizes[i] ?? 20,
                                height: innerSizes[i] ?? 20,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: innerColor,
                                borderRadius: blobType === 'circle' ? '50%' : '0'
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Layer 2: The Content (Foreground) */}
            <div className="relative z-10 flex flex-col min-h-screen w-full">
                {children}
            </div>
        </div>
    );
}