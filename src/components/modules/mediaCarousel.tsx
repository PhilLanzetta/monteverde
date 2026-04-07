'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import VimeoPlayer from '@vimeo/player'
import type { Asset } from 'contentful'
import type { MediaCarouselEntry } from '@/types/event'
import styles from './mediaCarousel.module.css'

// ── URL detection ─────────────────────────────────────
function getSourceType(url: string): 'vimeo' | 'youtube' | 'direct' {
  if (url.includes('vimeo.com')) return 'vimeo'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  return 'direct'
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
  )
  return match ? match[1] : null
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// ── Shared controls UI ────────────────────────────────
interface ControlsProps {
  isPlaying: boolean
  progress: number
  currentTime: string
  duration: string
  volume: number
  title?: string
  onPlayPause: () => void
  onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFullscreen: () => void
}

function PlayerControls({
  isPlaying,
  progress,
  currentTime,
  duration,
  volume,
  title,
  onPlayPause,
  onProgressClick,
  onVolumeChange,
  onFullscreen,
}: ControlsProps) {
  return (
    <div className={styles.videoControls}>
      {title && <p className={styles.videoTitle}>{title}</p>}
      <div className={styles.progressBar} onClick={onProgressClick}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
        <div
          className={styles.progressThumb}
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className={styles.controlsRow}>
        <span className={styles.timeDisplay}>
          {currentTime} - {duration}
        </span>
        <div className={styles.centerControls}>
          <button
            className={styles.controlBtn}
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <span className={styles.pauseIcon}>
                <span />
                <span />
              </span>
            ) : (
              <span className={styles.playIcon} />
            )}
          </button>
        </div>
        <div className={styles.rightControls}>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            aria-hidden='true'
          >
            <polygon points='2,5 6,5 10,2 10,14 6,11 2,11' fill='#fff' />
            <path
              d='M12 5.5 Q14.5 8 12 10.5'
              stroke='#fff'
              strokeWidth='1.2'
              fill='none'
              strokeLinecap='round'
            />
          </svg>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volume}
            onChange={onVolumeChange}
            className={styles.volumeSlider}
            aria-label='Volume'
          />
          <button
            className={styles.controlBtn}
            onClick={onFullscreen}
            aria-label='Fullscreen'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              aria-hidden='true'
            >
              <path
                d='M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9'
                stroke='#fff'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Vimeo Player ──────────────────────────────────────
function VimeoVideoPlayer({
  src,
  poster,
  title,
}: {
  src: string
  poster?: string
  title?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<VimeoPlayer | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const playingRef = useRef(false)
  const lastKnownTime = useRef(0)
  const lastKnownDur = useRef(0)
  const lastTimestamp = useRef(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [volume, setVolume] = useState(1)

  function tick(timestamp: number) {
    if (!playingRef.current) return
    const elapsed = (timestamp - lastTimestamp.current) / 1000
    const interpolated = Math.min(
      lastKnownTime.current + elapsed,
      lastKnownDur.current,
    )
    setCurrentTime(formatTime(interpolated))
    setProgress(
      lastKnownDur.current ? (interpolated / lastKnownDur.current) * 100 : 0,
    )
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (!containerRef.current) return
    const id = getVimeoId(src)
    if (!id) return

    const player = new VimeoPlayer(containerRef.current, {
      id: parseInt(id),
      controls: false,
      responsive: true,
      autopause: false,
    })

    playerRef.current = player

    player.getDuration().then((d) => {
      lastKnownDur.current = d
      setDuration(formatTime(d))
    })

    player.on('timeupdate', ({ seconds, duration: dur }) => {
      lastKnownTime.current = seconds
      lastKnownDur.current = dur
      lastTimestamp.current = performance.now()
    })

    player.on('play', () => {
      playingRef.current = true
      setIsPlaying(true)
      lastTimestamp.current = performance.now()
      rafRef.current = requestAnimationFrame(tick)
    })

    player.on('pause', () => {
      playingRef.current = false
      setIsPlaying(false)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    })

    player.on('ended', () => {
      playingRef.current = false
      setIsPlaying(false)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    })

    return () => {
      playingRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      player.destroy()
    }
  }, [src])

  function onPlayPause() {
    if (!playerRef.current) return
    if (isPlaying) {
      playerRef.current.pause()
    } else {
      playerRef.current.play()
    }
  }

  function onProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!playerRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    playerRef.current.getDuration().then((dur) => {
      playerRef.current?.setCurrentTime(ratio * dur)
      lastKnownTime.current = ratio * dur
      lastTimestamp.current = performance.now()
    })
  }

  function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value)
    setVolume(val)
    playerRef.current?.setVolume(val)
  }

  function onFullscreen() {
    if (!wrapRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      wrapRef.current.requestFullscreen()
    }
  }

  return (
    <div ref={wrapRef} className={styles.videoWrap}>
      <div ref={containerRef} className={styles.playerWrapper} />
      <PlayerControls
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        title={title}
        onPlayPause={onPlayPause}
        onProgressClick={onProgressClick}
        onVolumeChange={onVolumeChange}
        onFullscreen={onFullscreen}
      />
    </div>
  )
}

// ── YouTube Player ────────────────────────────────────
function YouTubeVideoPlayer({ src, title }: { src: string; title?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<YT.Player | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [volume, setVolume] = useState(1)
  const videoId = getYouTubeId(src)

  function tick() {
    if (!playerRef.current) return
    const ct = playerRef.current.getCurrentTime()
    const dur = playerRef.current.getDuration()
    setCurrentTime(formatTime(ct))
    setProgress(dur ? (ct / dur) * 100 : 0)
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (!videoId) return

    function initPlayer() {
      if (!iframeRef.current) return
      playerRef.current = new YT.Player(iframeRef.current, {
        events: {
          onReady: (e: { target: YT.Player }) => {
            setDuration(formatTime(e.target.getDuration()))
          },
          onStateChange: (e: { data: number; target: YT.Player }) => {
            if (e.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              setDuration(formatTime(e.target.getDuration()))
              rafRef.current = requestAnimationFrame(tick)
            } else {
              setIsPlaying(false)
              if (rafRef.current) cancelAnimationFrame(rafRef.current)
            }
          },
        },
      })
    }

    if (typeof YT !== 'undefined' && YT.Player) {
      initPlayer()
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
      ;(window as any).onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      playerRef.current?.destroy()
    }
  }, [videoId])

  function onPlayPause() {
    if (!playerRef.current) return
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  function onProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!playerRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    playerRef.current.seekTo(ratio * playerRef.current.getDuration(), true)
  }

  function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value)
    setVolume(val)
    playerRef.current?.setVolume(val * 100)
  }

  function onFullscreen() {
    if (!wrapRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      wrapRef.current.requestFullscreen()
    }
  }

  if (!videoId) return null

  return (
    <div ref={wrapRef} className={styles.videoWrap}>
      <div className={styles.playerWrapper}>
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&disablekb=1&modestbranding=1`}
          allow='autoplay; encrypted-media'
          className={styles.iframe}
          title={title ?? 'YouTube video'}
        />
      </div>
      <PlayerControls
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        title={title}
        onPlayPause={onPlayPause}
        onProgressClick={onProgressClick}
        onVolumeChange={onVolumeChange}
        onFullscreen={onFullscreen}
      />
    </div>
  )
}

// ── Direct Video Player ───────────────────────────────
function DirectVideoPlayer({
  src,
  poster,
  title,
}: {
  src: string
  poster?: string
  title?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [volume, setVolume] = useState(1)

  function onPlayPause() {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  function onProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = ratio * videoRef.current.duration
  }

  function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (videoRef.current) videoRef.current.volume = val
  }

  function onFullscreen() {
    if (!wrapRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      wrapRef.current.requestFullscreen()
    }
  }

  return (
    <div ref={wrapRef} className={styles.videoWrap}>
      <div className={styles.playerWrapper}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload='metadata'
          className={styles.iframe}
          onTimeUpdate={() => {
            if (!videoRef.current) return
            const { currentTime: ct, duration: dur } = videoRef.current
            setCurrentTime(formatTime(ct))
            setProgress(dur ? (ct / dur) * 100 : 0)
          }}
          onLoadedMetadata={() => {
            if (!videoRef.current) return
            setDuration(formatTime(videoRef.current.duration))
          }}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
      <PlayerControls
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        title={title}
        onPlayPause={onPlayPause}
        onProgressClick={onProgressClick}
        onVolumeChange={onVolumeChange}
        onFullscreen={onFullscreen}
      />
    </div>
  )
}

// ── Video router ──────────────────────────────────────
function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string
  poster?: string
  title?: string
}) {
  const type = getSourceType(src)
  if (type === 'vimeo')
    return <VimeoVideoPlayer src={src} poster={poster} title={title} />
  if (type === 'youtube') return <YouTubeVideoPlayer src={src} title={title} />
  return <DirectVideoPlayer src={src} poster={poster} title={title} />
}

// ── Media Item ────────────────────────────────────────
function MediaItem({ item, priority }: { item: any; priority?: boolean }) {
  const type = item.sys.contentType.sys.id

  if (type === 'videoWrapper') {
    const posterAsset = item.fields.posterImage as unknown as Asset
    const posterUrl = posterAsset?.fields?.file?.url
      ? `https:${posterAsset.fields.file.url}`
      : undefined
    return (
      <VideoPlayer
        src={item.fields.videoLink as string}
        poster={posterUrl}
        title={item.fields.title as string | undefined}
      />
    )
  }

  if (type === 'imageWrapper') {
    const imageAsset = item.fields.image as unknown as Asset
    const imageUrl = imageAsset?.fields?.file?.url
      ? `https:${imageAsset.fields.file.url}`
      : null
    if (!imageUrl) return null
    return (
      <div className={styles.imageWrap}>
        <Image
          src={imageUrl}
          alt={(item.fields.caption as string) ?? ''}
          fill
          className={styles.image}
          priority={priority}
        />
      </div>
    )
  }

  return null
}

// ── Carousel ──────────────────────────────────────────
export default function MediaCarousel({
  entry,
}: {
  entry: MediaCarouselEntry
}) {
  const items = (entry.fields.media as unknown as any[]) ?? []
  if (!items.length) return null

  const looped = [...items, ...items, ...items]
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(items.length)
  const isJumping = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const itemWidth = track.scrollWidth / looped.length
    track.scrollLeft = itemWidth * items.length
  }, [])

  function onScroll() {
    const track = trackRef.current
    if (!track || isJumping.current) return
    const itemWidth = track.scrollWidth / looped.length
    const index = Math.round(track.scrollLeft / itemWidth)
    setCurrentIndex(index)
    if (index <= 2) {
      isJumping.current = true
      track.scrollLeft += itemWidth * items.length
      isJumping.current = false
    } else if (index >= looped.length - 3) {
      isJumping.current = true
      track.scrollLeft -= itemWidth * items.length
      isJumping.current = false
    }
  }

  const realIndex = currentIndex % items.length
  const caption = items[realIndex]?.fields?.caption as string | undefined

  return (
    <>
      <h2 className={styles.heading}>Media</h2>
      <section className={styles.section}>
        <div ref={trackRef} className={styles.track} onScroll={onScroll}>
          {looped.map((item: any, i: number) => (
            <div key={i} className={styles.slide}>
              <MediaItem item={item} priority={i === items.length} />
            </div>
          ))}
        </div>
        {caption && <p className={styles.caption}>{caption}</p>}
      </section>
    </>
  )
}
