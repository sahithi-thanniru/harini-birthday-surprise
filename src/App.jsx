import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Gift, Heart, Image as ImageIcon, Sparkles, Users, X } from 'lucide-react'
import confetti from 'canvas-confetti'
import { findPersonByName } from './data/people.js'
import './App.css'

function launchConfetti(options) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  confetti(options)
}

function getDisplayName(profile) {
  return profile.displayName ?? profile.name
}

function RobotCat() {
  return (
    <div className="robot-cat" role="img" aria-label="Cute blue robotic cat">
      <div className="robot-ear left-ear"><span /></div>
      <div className="robot-ear right-ear"><span /></div>
      <div className="robot-head">
        <div className="robot-face">
          <span className="robot-eye left-eye" />
          <span className="robot-eye right-eye" />
          <span className="robot-nose" />
          <span className="robot-mouth">⌄</span>
        </div>
      </div>
      <div className="robot-paw left-paw" />
      <div className="robot-paw right-paw" />
      <div className="robot-body">
        <span className="robot-heart">♥</span>
        <span className="robot-stitch" />
      </div>
    </div>
  )
}

function CakeIllustration({ isBlown }) {
  const candles = [0, 1, 2]
  const sprinkles = [
    { left: '12%', top: '22%', rotate: '-35deg', color: '#e67e78' },
    { left: '27%', top: '35%', rotate: '28deg', color: '#78a9c2' },
    { left: '43%', top: '19%', rotate: '-25deg', color: '#e8b65f' },
    { left: '58%', top: '32%', rotate: '40deg', color: '#d985a2' },
    { left: '76%', top: '21%', rotate: '-32deg', color: '#7fae8a' },
    { left: '88%', top: '37%', rotate: '24deg', color: '#e8b65f' },
    { left: '19%', top: '65%', rotate: '20deg', color: '#d985a2' },
    { left: '36%', top: '57%', rotate: '-45deg', color: '#7fae8a' },
    { left: '64%', top: '63%', rotate: '34deg', color: '#e67e78' },
    { left: '82%', top: '60%', rotate: '-20deg', color: '#78a9c2' },
  ]

  return (
    <div className="cake-illustration" role="img" aria-label="Three-layer pink and cream birthday cake">
      <div className="cake-glow" />
      <div className="candles">
        {candles.map((candle) => (
          <div className={`candle candle-${candle + 1}`} key={candle}>
            <AnimatePresence>
              {!isBlown ? (
                <motion.span
                  className="candle-flame"
                  key="flame"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: [1, 0.9, 1.08, 1], rotate: [-3, 3, -2] }}
                  exit={{ opacity: 0, scale: 0.15, y: -16, transition: { duration: 0.28 } }}
                  transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
                />
              ) : (
                <motion.span
                  className="candle-smoke"
                  key="smoke"
                  initial={{ opacity: 0, scale: 0.45, y: 8 }}
                  animate={{ opacity: [0, 0.68, 0], scale: [0.5, 1.1, 1.5], y: -32, x: [-2, 4, 0] }}
                  transition={{ duration: 1.35, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
            <span className="candle-wick" />
            <span className="candle-body" />
          </div>
        ))}
      </div>

      <div className="cake-layer cake-top">
        <span className="cake-frosting" />
        {sprinkles.slice(0, 6).map((sprinkle, index) => (
          <i
            className="cake-sprinkle"
            key={`top-${index}`}
            style={{
              left: sprinkle.left,
              top: sprinkle.top,
              backgroundColor: sprinkle.color,
              transform: `rotate(${sprinkle.rotate})`,
            }}
          />
        ))}
        <span className="strawberry strawberry-top-left">🍓</span>
        <span className="strawberry strawberry-top-right">🍓</span>
      </div>
      <div className="cake-layer cake-middle">
        <span className="cake-frosting" />
        {sprinkles.slice(2, 8).map((sprinkle, index) => (
          <i
            className="cake-sprinkle"
            key={`middle-${index}`}
            style={{
              left: sprinkle.left,
              top: sprinkle.top,
              backgroundColor: sprinkle.color,
              transform: `rotate(${sprinkle.rotate})`,
            }}
          />
        ))}
        <span className="berry berry-one">♥</span>
        <span className="berry berry-two">♥</span>
        <span className="berry berry-three">♥</span>
      </div>
      <div className="cake-layer cake-bottom">
        <span className="cake-frosting" />
        {sprinkles.slice(4).map((sprinkle, index) => (
          <i
            className="cake-sprinkle"
            key={`bottom-${index}`}
            style={{
              left: sprinkle.left,
              top: sprinkle.top,
              backgroundColor: sprinkle.color,
              transform: `rotate(${sprinkle.rotate})`,
            }}
          />
        ))}
      </div>
      <div className="cake-plate">
        <span className="plate-stem" />
        <span className="plate-foot" />
      </div>
    </div>
  )
}

function CakeScreen({ profile, isBlown, onBlow, onContinue }) {
  return (
    <motion.div
      className={`cake-screen ${isBlown ? 'cake-screen-blown' : ''}`}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.97 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="cake-eyebrow">BIRTHDAY ROJU CHINNA MAGIC</p>
      <h1 className="cake-heading">EE ROJU NEE DAY, {getDisplayName(profile).toUpperCase()}! <span>❤️</span></h1>
      <p className="cake-subtitle">
        {isBlown ? 'Nee wish tvaralone nijam avvali...' : 'Kallu moosukoni oka manchi wish koruko...'}
      </p>
      {profile.cakeNote && <p className="profile-screen-note">{profile.cakeNote}</p>}

      <div className="birthday-scene">
        <motion.div
          className="cake-art-wrap"
          initial={{ opacity: 0, y: 34, scale: 0.88 }}
          animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
          transition={{
            opacity: { delay: 0.25, duration: 0.55 },
            scale: { delay: 0.25, duration: 0.55 },
            y: { delay: 0.8, duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <CakeIllustration isBlown={isBlown} />
        </motion.div>
        <motion.div
          className="cake-mascot"
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1, y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
          transition={{
            opacity: { delay: 0.48 },
            x: { delay: 0.48 },
            scale: { delay: 0.48 },
            y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="mascot-party-hat">✦</span>
          <RobotCat />
          <span className="mascot-speech">Yesss!</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {isBlown && (
          <motion.div
            className="cake-celebration-decor"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {['♡', '✦', '♥', '✧', '♡', '✦'].map((shape, index) => (
              <motion.span
                className={`celebration-float celebration-float-${index + 1}`}
                key={`${shape}-${index}`}
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.8], y: [-6, -34, -56], scale: [0.6, 1, 0.8] }}
                transition={{ duration: 2.2, delay: index * 0.12, repeat: Infinity, repeatDelay: 0.4 }}
              >
                {shape}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!isBlown ? (
        <motion.button
          type="button"
          className="surprise-button blow-button"
          onClick={onBlow}
          whileHover={{ y: -4, scale: 1.035 }}
          whileTap={{ y: 1, scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          CANDLES BLOW CHEY <span>🕯️</span>
        </motion.button>
      ) : (
        <motion.div
          className="birthday-wishes"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="birthday-greeting"
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12 }}
          >
            HAPPY BIRTHDAY, {getDisplayName(profile).toUpperCase()}! FULL GA ENJOY CHEY! <span>❤️</span>
          </motion.h2>
          <p className="birthday-dream">Nee dreams anni nijam avvali!</p>
          <p className="birthday-note">
            Ee year neeku endless happiness, beautiful memories, success, nee heart korukunna manchi vishayalu anni teesukuraavali.
          </p>
          <motion.button
            type="button"
            className="surprise-button memories-button"
            onClick={onContinue}
            whileHover={{ y: -4, scale: 1.025 }}
            whileTap={{ y: 1, scale: 0.98 }}
          >
            MANA MEMORIES CHUDDAM <span>📸</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

function PhotoFallback({ src }) {
  return (
    <span className="photo-fallback">
      <ImageIcon size={28} strokeWidth={1.5} />
      <span>Photo not found</span>
      <small>Add {src.replace(/^\/+/, 'public/')}</small>
    </span>
  )
}

function PhotoViewer({ profile, photos, selectedIndex, onChange, onClose, failedPhotos, onImageError }) {
  const photo = photos[selectedIndex]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onChange((selectedIndex - 1 + photos.length) % photos.length)
      if (event.key === 'ArrowRight') onChange((selectedIndex + 1) % photos.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onChange, onClose, photos.length, selectedIndex])

  return (
    <motion.div
      className="photo-viewer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${selectedIndex + 1} of ${photos.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="photo-viewer"
        initial={{ opacity: 0, y: 22, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="viewer-close"
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <X size={21} />
        </button>
        <button
          type="button"
          className="viewer-arrow viewer-previous"
          onClick={() => onChange((selectedIndex - 1 + photos.length) % photos.length)}
          aria-label="Previous photo"
        >
          <ChevronLeft size={25} />
        </button>
        <div className="viewer-photo-frame">
          {failedPhotos.has(photo.src) ? (
            <PhotoFallback src={photo.src} />
          ) : (
            <img
              src={photo.src}
              alt={`${getDisplayName(profile)} memory ${selectedIndex + 1}`}
              onError={() => onImageError(photo.src)}
            />
          )}
          <p>{photo.caption}</p>
        </div>
        <button
          type="button"
          className="viewer-arrow viewer-next"
          onClick={() => onChange((selectedIndex + 1) % photos.length)}
          aria-label="Next photo"
        >
          <ChevronRight size={25} />
        </button>
        <p className="viewer-counter">{selectedIndex + 1} / {photos.length}</p>
      </motion.div>
    </motion.div>
  )
}

function MemoriesGallery({ profile, onContinue }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [failedPhotos, setFailedPhotos] = useState(() => new Set())

  const markImageMissing = (src) => {
    setFailedPhotos((current) => new Set(current).add(src))
  }

  return (
    <motion.div
      className="memories-gallery"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55 }}
    >
      <span className="gallery-sticker gallery-sticker-heart" aria-hidden="true">♡</span>
      <span className="gallery-sticker gallery-sticker-star" aria-hidden="true">✦</span>
      <span className="gallery-tape gallery-tape-left" aria-hidden="true" />
      <span className="gallery-tape gallery-tape-right" aria-hidden="true" />

      <p className="gallery-eyebrow">A SCRAPBOOK FULL OF {getDisplayName(profile).toUpperCase()}</p>
      <h1 className="gallery-heading">{profile.galleryTitle}</h1>
      <p className="gallery-subheading">{profile.gallerySubtitle}</p>

      <div className="polaroid-grid">
        {profile.photos.map((photo, index) => {
          const rotations = [-2.4, 1.8, -1.2, 2.7, -2.1]
          const rotation = rotations[index % rotations.length]

          return (
            <motion.button
              type="button"
              className={`polaroid polaroid-${(index % 5) + 1}`}
              key={photo.src}
              aria-label={`Open ${getDisplayName(profile)}'s photo ${index + 1}: ${photo.caption}`}
              onClick={() => setSelectedIndex(index)}
              initial={{ opacity: 0, y: 22, rotate: rotation * 1.8 }}
              animate={{ opacity: 1, y: 0, rotate: rotation }}
              transition={{ delay: 0.07 * index, duration: 0.42, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.045, rotate: 0, zIndex: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="polaroid-tape" aria-hidden="true" />
              <span className="polaroid-heart" aria-hidden="true">{index % 3 === 0 ? '♡' : ''}</span>
              <span className="polaroid-image">
                {failedPhotos.has(photo.src) ? (
                  <PhotoFallback src={photo.src} />
                ) : (
                  <img
                    src={photo.src}
                    alt={`${getDisplayName(profile)} memory ${index + 1}`}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    onError={() => markImageMissing(photo.src)}
                  />
                )}
              </span>
              <span className="polaroid-caption">{photo.caption}</span>
            </motion.button>
          )
        })}
      </div>

      <p className="gallery-footer">
        {profile.galleryFooter}
      </p>
      <motion.button
        type="button"
        className="surprise-button gallery-next-button"
        onClick={onContinue}
        whileHover={{ y: -4, scale: 1.025 }}
        whileTap={{ y: 1, scale: 0.98 }}
      >
        OPEN YOUR GIFTS <Gift size={20} />
      </motion.button>

      <AnimatePresence>
        {selectedIndex !== null && (
          <PhotoViewer
            profile={profile}
            photos={profile.photos}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            onClose={() => setSelectedIndex(null)}
            failedPhotos={failedPhotos}
            onImageError={markImageMissing}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function GiftBox({ theme, isActive }) {
  return (
    <span className={`gift-box-illustration gift-box-${theme}`} aria-hidden="true">
      <motion.span
        className="gift-box-lid"
        animate={isActive ? { y: -17, rotate: -10, rotateX: 28 } : { y: 0, rotate: 0, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 190, damping: 15 }}
      >
        <span className="gift-bow-loop gift-bow-left" />
        <span className="gift-bow-loop gift-bow-right" />
        <span className="gift-bow-knot" />
      </motion.span>
      <span className="gift-box-body">
        <span className="gift-ribbon gift-ribbon-vertical" />
        <span className="gift-ribbon gift-ribbon-horizontal" />
        <span className="gift-box-shine" />
      </span>
      <Sparkles className="gift-box-sparkle gift-box-sparkle-left" size={17} />
      <Sparkles className="gift-box-sparkle gift-box-sparkle-right" size={14} />
    </span>
  )
}

function GiftMessage({ gift, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      className="gift-message-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${gift.title} message`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        className={`gift-message-card gift-message-${gift.theme}`}
        initial={{ opacity: 0, y: 26, scale: 0.88, rotate: -2 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 16, scale: 0.9, rotate: 2 }}
        transition={{ type: 'spring', stiffness: 170, damping: 17 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="gift-message-close"
          onClick={onClose}
          aria-label="Close gift message"
        >
          <X size={21} />
        </button>
        <motion.div
          className="gift-message-heart"
          animate={{ scale: [1, 1.11, 1], rotate: [-4, 4, -4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart size={38} fill="currentColor" />
        </motion.div>
        {gift.kind !== 'promise' && <p className="gift-message-kicker">{gift.title}</p>}
        {gift.kind === 'mirror' ? (
          <div className="mirror-gift-content">
            <motion.div
              className="mirror-gift-illustration"
              role="img"
              aria-label="A cute pig reflected inside a decorative mirror"
              animate={{ rotate: [-3, 3, -3], scale: [1, 1.06, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <span className="mirror-glass">
                <span className="mirror-pig" aria-hidden="true">🐷</span>
              </span>
              <span className="mirror-frame-heart" aria-hidden="true">♡</span>
              <Sparkles aria-hidden="true" />
            </motion.div>
            <motion.p className="mirror-joke-line" initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
              WAITTT... 😂
            </motion.p>
            <p>LOOK AT THIS PICTURE!</p>
            <p>Isn&apos;t it looking exactly like you? 👀</p>
            <p>Don&apos;t worry, it&apos;s not a mirror! 🤣❤️</p>
          </div>
        ) : gift.kind === 'promise' ? (
          <motion.div
            className="promise-gift-card"
            animate={{ scale: [1, 1.008, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="promise-card-heart promise-card-heart-left" aria-hidden="true">♥</span>
            <span className="promise-card-heart promise-card-heart-right" aria-hidden="true">♡</span>
            <p className="promise-gift-heading">{gift.title}</p>
            <p className="promise-gift-copy">{gift.message[0]}</p>
            <p className="promise-screenshot-instruction">📸 TAKE A SCREENSHOT OF THIS CARD!</p>
            <p className="promise-save-note">Keep this card safe. Whenever you need anything, just show it to me! ❤️</p>
          </motion.div>
        ) : (
          <div className="gift-message-copy">
            {gift.message.map((line, index) => (
              <p className={index === 0 ? 'gift-message-opening' : ''} key={line}>
                {line}
              </p>
            ))}
          </div>
        )}
        <span className="gift-message-flower" aria-hidden="true">✿</span>
      </motion.section>
    </motion.div>
  )
}

function GiftsScreen({ profile, openedGiftIds, onGiftOpened, onContinue }) {
  const [activeGift, setActiveGift] = useState(null)
  const allOpened = openedGiftIds.length === profile.gifts.length

  const openGift = (gift) => {
    onGiftOpened(gift.id)
    setActiveGift(gift)
  }

  return (
    <motion.div
      className="gifts-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.55 }}
    >
      <span className="gift-screen-sticker gift-sticker-heart" aria-hidden="true">♡</span>
      <span className="gift-screen-sticker gift-sticker-star" aria-hidden="true">✦</span>
      <p className="gifts-eyebrow">WRAPPED WITH A WHOLE LOT OF LOVE</p>
      <h1 className="gifts-heading">{profile.giftsHeading}</h1>
      <p className="gifts-subtitle">{profile.giftsSubtitle}</p>

      <div className={`gift-box-grid ${profile.gifts.length > 3 ? 'gift-box-grid-five' : ''}`}>
        {profile.gifts.map((gift, index) => {
          const isOpened = openedGiftIds.includes(gift.id)
          const isActive = activeGift?.id === gift.id
          const status = isOpened ? 'Reopen' : 'Open'

          return (
            <motion.button
              type="button"
              className={`gift-card gift-card-${gift.theme} ${isOpened ? 'gift-card-opened' : ''}`}
              key={gift.id}
              aria-label={`${status} surprise ${index + 1}: ${gift.title}`}
              onClick={() => openGift(gift)}
              initial={{ opacity: 0, y: 25, rotate: index === 1 ? 2 : -2 }}
              animate={{ opacity: 1, y: 0, rotate: index === 1 ? 1 : -1 }}
              transition={{ delay: 0.12 * index, duration: 0.48 }}
              whileHover={{ y: -7, scale: 1.035, rotate: 0, zIndex: 2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="gift-card-number">SURPRISE {index + 1}</span>
              <GiftBox theme={gift.theme} isActive={isActive} />
              <span className="gift-card-title">{gift.title}</span>
              <span className="gift-card-action">
                {isOpened ? <Check size={15} strokeWidth={3} /> : <Heart size={15} />}
                {isOpened ? 'Opened — tap to read again' : 'Tap to open'}
              </span>
              {isOpened && (
                <motion.span
                  className="gift-opened-badge"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 13 }}
                >
                  <Check size={14} strokeWidth={3} />
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {allOpened && (
          <motion.section
            className="all-gifts-unlocked"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ type: 'spring', stiffness: 150, damping: 16 }}
          >
            <div className="unlocked-sparkles" aria-hidden="true">
              <Sparkles className="unlocked-sparkle unlocked-sparkle-one" />
              <Sparkles className="unlocked-sparkle unlocked-sparkle-two" />
            </div>
            <div className="unlocked-hearts" aria-hidden="true">
              {['♡', '♥', '♡'].map((heart, index) => (
                <motion.span
                  key={index}
                  animate={{ y: [0, -10, 0], rotate: [-8, 8, -8] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {heart}
                </motion.span>
              ))}
            </div>
            <h2>YOU UNLOCKED ALL {profile.gifts.length === 5 ? 'FIVE' : 'THREE'} SURPRISES! <span>❤️</span></h2>
            <p>Waittt {getDisplayName(profile)}... inka okka chinna surprise undi! 🥹</p>
            <motion.button
              type="button"
              className="surprise-button letter-button"
              onClick={onContinue}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ y: 1, scale: 0.97 }}
            >
              READ MY LETTER <span>💌</span>
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGift && (
          <GiftMessage gift={activeGift} onClose={() => setActiveGift(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function BirthdayLetterScreen({ profile, onBack, onContinue }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    const timer = window.setTimeout(() => setIsComplete(true), 4800)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  const letterVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.38,
      },
    },
  }
  const lineVariants = {
    hidden: { opacity: 0, y: 7 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
  }

  return (
    <motion.div
      className={`birthday-letter-screen ${isOpen ? 'letter-is-open' : ''}`}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.55 }}
    >
      <span className="letter-doodle letter-doodle-heart" aria-hidden="true">♡</span>
      <span className="letter-doodle letter-doodle-star" aria-hidden="true">✦</span>
      <span className="letter-washi letter-washi-left" aria-hidden="true" />
      <span className="letter-washi letter-washi-right" aria-hidden="true" />
      <p className="letter-eyebrow">NEEKOSAM OKA CHINNA NOTE</p>
      <h1 className="letter-heading">Neekosam oka chinna letter...</h1>

      <div className="letter-scene">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="letter-floating-decor"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {['♡', '✧', '♥', '✦', '♡', '✧'].map((shape, index) => (
                <motion.span
                  className={`letter-float letter-float-${index + 1}`}
                  key={`${shape}-${index}`}
                  initial={{ opacity: 0, y: 12, scale: 0.6 }}
                  animate={{ opacity: [0.35, 0.9, 0.35], y: [-3, -18, -3], scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.22, ease: 'easeInOut' }}
                >
                  {shape}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="letter-envelope-art"
          initial={false}
          animate={isOpen ? { y: 25, scale: 0.96 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="letter-envelope-back" />
          <motion.div
            className="letter-envelope-flap"
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="letter-envelope-front" />
          <motion.span
            className="letter-envelope-seal"
            animate={isOpen ? { opacity: 0, scale: 1.3, y: 10 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.24 }}
          >
            <Heart size={20} fill="currentColor" />
          </motion.span>
        </motion.div>

        <motion.div
          className="letter-robot"
          animate={isOpen ? { y: [0, -5, 0], rotate: [0, 3, 0, -3, 0] } : { y: [0, -4, 0] }}
          transition={{
            y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="letter-robot-sparkle">✧</span>
          <RobotCat />
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-letter"
              className="closed-letter"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.28 }}
            >
              <span className="closed-letter-icon" aria-hidden="true">💌</span>
              <p>{profile.letterClosedMessage}</p>
              <motion.button
                type="button"
                className="surprise-button open-letter-button"
                onClick={() => setIsOpen(true)}
                whileHover={{ y: -4, scale: 1.025 }}
                whileTap={{ y: 1, scale: 0.98 }}
              >
                OPEN MY LETTER <Heart size={18} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.article
              key="personal-letter"
              className="personal-letter"
              initial={{ opacity: 0, y: 36, scaleY: 0.82, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, scaleY: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, y: -12, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="personal-letter-tape" aria-hidden="true" />
              <motion.div
                className="personal-letter-copy"
                variants={letterVariants}
                initial="hidden"
                animate="visible"
              >
                {profile.letterLines.map((line, index) => (
                  <motion.p
                    className={[
                      index === 0 ? 'letter-greeting' : '',
                      index === profile.letterLines.length - 2 ? 'letter-signoff' : '',
                      index === profile.letterLines.length - 1 ? 'letter-signature' : '',
                    ].filter(Boolean).join(' ')}
                    variants={lineVariants}
                    key={line}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && isComplete && (
          <motion.div
            className="letter-finale-prompt"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5 }}
          >
            <p>Neetho cheppalanukunna anni ive... ❤️</p>
            <motion.button
              type="button"
              className="surprise-button last-surprise-button"
              onClick={onContinue}
              whileHover={{ y: -4, scale: 1.025 }}
              whileTap={{ y: 1, scale: 0.98 }}
            >
              ONE LAST SURPRISE <span>✨</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="button" className="letter-back-link" onClick={onBack}>
        Back to your surprises
      </button>
    </motion.div>
  )
}

function BirthdayFinaleScreen({ profile, onReplay }) {
  const [showCelebrateMessage, setShowCelebrateMessage] = useState(false)
  const [celebrationBurst, setCelebrationBurst] = useState(0)
  const entranceConfettiStarted = useRef(false)
  const messageTimer = useRef(null)

  useEffect(() => {
    if (!entranceConfettiStarted.current) {
      entranceConfettiStarted.current = true
      launchConfetti({
        particleCount: 175,
        spread: 105,
        startVelocity: 42,
        origin: { y: 0.62 },
        colors: ['#e86d73', '#f39a70', '#f7cb76', '#f8ead2', '#d999b2', '#87b9c9'],
      })
      launchConfetti({
        particleCount: 65,
        spread: 135,
        startVelocity: 27,
        origin: { y: 0.57 },
        colors: ['#e86d73', '#f39a70', '#f7cb76', '#f8ead2'],
      })
    }

    return () => window.clearTimeout(messageTimer.current)
  }, [])

  const celebrateAgain = () => {
    launchConfetti({
      particleCount: 125,
      spread: 88,
      startVelocity: 39,
      origin: { y: 0.65 },
      colors: ['#e86d73', '#f39a70', '#f7cb76', '#f8ead2', '#d999b2'],
    })
    setCelebrationBurst((count) => count + 1)
    setShowCelebrateMessage(true)
    window.clearTimeout(messageTimer.current)
    messageTimer.current = window.setTimeout(() => setShowCelebrateMessage(false), 2600)
  }

  return (
    <motion.div
      className="birthday-finale-screen"
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.98 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="finale-floating-decor" aria-hidden="true">
        {['♡', '✦', '♥', '✧', '♡', '✦', '✧'].map((shape, index) => (
          <motion.span
            className={`finale-float finale-float-${index + 1}`}
            key={`${shape}-${index}`}
            initial={{ opacity: 0, y: 10, scale: 0.7 }}
            animate={{ opacity: [0.38, 0.82, 0.38], y: [-3, -17, -3], scale: [0.86, 1, 0.86] }}
            transition={{ duration: 3.4, delay: index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
          >
            {shape}
          </motion.span>
        ))}
        <span className="finale-ribbon finale-ribbon-left" />
        <span className="finale-ribbon finale-ribbon-right" />
      </div>

      <p className="finale-eyebrow">MANA SCRAPBOOK LO LAST PAGE</p>
      <motion.h1
        className="finale-heading"
        initial={{ opacity: 0, y: 16, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        HAPPY BIRTHDAY {getDisplayName(profile).toUpperCase()}, FULL ENJOY CHEY! <span>❤️🎂</span>
      </motion.h1>
      <motion.p
        className="finale-today"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.52, duration: 0.6 }}
      >
        Ivala full focus neepaine!
      </motion.p>

      <div className="finale-main-row">
        <motion.div
          className="finale-message-panel"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.58, duration: 0.6 }}
        >
          {profile.finaleMessage.map((line, index) => (
            <p className={index === profile.finaleMessage.length - 1 ? 'finale-universe' : ''} key={line}>
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="finale-mascot"
          role="presentation"
          initial={{ opacity: 0, scale: 0.72, x: 16 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: [0, -9, 0], rotate: [0, 2, 0, -2, 0] }}
          transition={{
            opacity: { delay: 0.65, duration: 0.5 },
            scale: { delay: 0.65, duration: 0.5 },
            x: { delay: 0.65, duration: 0.5 },
            y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="finale-cat-sparkle">✦</span>
          <RobotCat />
          <span className="finale-cat-cheer">Yesss!</span>
        </motion.div>
      </div>

      <motion.div
        className="finale-signature"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.86, duration: 0.55 }}
      >
        <p>Chala chala love tho,</p>
        <strong>SAHITHI <span>🫰🏻</span></strong>
        <motion.span
          className="signature-heart"
          animate={{ scale: [1, 1.18, 1], rotate: [-8, 8, -8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          aria-hidden="true"
        >
          ♥
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {showCelebrateMessage && (
          <motion.p
            key={celebrationBurst}
            className="celebration-toast"
            role="status"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.94 }}
          >
            Birthday happiness unlock ayyindi! ❤️
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {celebrationBurst > 0 && (
          <motion.div
            className="finale-heart-burst"
            key={celebrationBurst}
            aria-hidden="true"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2 }}
          >
            {['♥', '♡', '♥', '♡', '✦'].map((shape, index) => (
              <motion.span
                key={`${celebrationBurst}-${index}`}
                initial={{ opacity: 0, y: 12, scale: 0.6, x: (index - 2) * 9 }}
                animate={{ opacity: [0, 1, 0], y: -70 - index * 8, scale: [0.7, 1.1, 0.8] }}
                transition={{ duration: 1.8, delay: index * 0.08, ease: 'easeOut' }}
              >
                {shape}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="finale-buttons">
        <motion.button
          type="button"
          className="surprise-button finale-celebrate-button"
          onClick={celebrateAgain}
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ y: 1, scale: 0.97 }}
        >
          CELEBRATE AGAIN! <span>🎉</span>
        </motion.button>
        <motion.button
          type="button"
          className="finale-replay-button"
          onClick={onReplay}
          whileHover={{ y: -3, scale: 1.025 }}
          whileTap={{ y: 1, scale: 0.98 }}
        >
          RELIVE THE SURPRISE <span>↺</span>
        </motion.button>
      </div>

      <footer className="finale-footer">
        <p>Made with ❤️ by Sahithi, especially for {getDisplayName(profile)}.</p>
        <small>{profile.footerMessage}</small>
      </footer>
    </motion.div>
  )
}

function NameEntry({ onSelect }) {
  const [name, setName] = useState('')
  const [hasUnknownName, setHasUnknownName] = useState(false)
  const inputRef = useRef(null)

  const submitName = (event) => {
    event.preventDefault()
    const profile = findPersonByName(name)

    if (!profile) {
      setHasUnknownName(true)
      return
    }

    onSelect(profile)
  }

  const tryAgain = () => {
    setName('')
    setHasUnknownName(false)
    inputRef.current?.focus()
  }

  return (
    <motion.div
      className="name-entry-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.5 }}
    >
      <p className="eyebrow">A LITTLE SURPRISE, JUST FOR YOU</p>
      <h1 className="name-entry-heading">Someone has prepared a little surprise for you! 🎁</h1>
      <p className="subtitle">First, tell me your name...</p>

      <form className="name-entry-form" onSubmit={submitName}>
        <label htmlFor="surprise-name">Your name</label>
        <input
          ref={inputRef}
          id="surprise-name"
          autoComplete="off"
          placeholder="Enter your name here ❤️"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setHasUnknownName(false)
          }}
        />
        <motion.button
          type="submit"
          className="surprise-button name-entry-submit"
          whileHover={{ y: -4, scale: 1.025 }}
          whileTap={{ y: 1, scale: 0.98 }}
        >
          UNLOCK MY SURPRISE <Sparkles size={18} />
        </motion.button>
      </form>

      <AnimatePresence>
        {hasUnknownName && (
          <motion.div
            className="name-entry-error"
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <p>Oops! I couldn&apos;t find your surprise. 🥺</p>
            <p>Check the spelling and try again!</p>
            <button type="button" className="name-entry-retry" onClick={tryAgain}>
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="name-entry-note">A little name check to find your scrapbook page.</p>
    </motion.div>
  )
}

function BirthdayExperience() {
  const [isOpening, setIsOpening] = useState(false)
  const [screen, setScreen] = useState('name-entry')
  const [profile, setProfile] = useState(null)
  const noCountRef = useRef(0)
  const [noMessage, setNoMessage] = useState('')
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [celebrating, setCelebrating] = useState(false)
  const [excitementCelebrating, setExcitementCelebrating] = useState(false)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [openedGiftIds, setOpenedGiftIds] = useState([])
  const openedGiftIdsRef = useRef(new Set())
  const screenTimeoutsRef = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen])

  useEffect(() => {
    document.title = profile
      ? `A Little Birthday Surprise for ${getDisplayName(profile)}`
      : 'A Little Birthday Surprise'
  }, [profile])

  useEffect(() => () => {
    screenTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
  }, [])

  const clearScheduledScreens = () => {
    screenTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    screenTimeoutsRef.current = []
  }

  const scheduleScreen = (nextScreen, delay) => {
    const timeoutId = window.setTimeout(() => {
      screenTimeoutsRef.current = screenTimeoutsRef.current.filter((id) => id !== timeoutId)
      setScreen(nextScreen)
    }, delay)
    screenTimeoutsRef.current.push(timeoutId)
  }

  const resetInteractionState = () => {
    setIsOpening(false)
    noCountRef.current = 0
    setNoMessage('')
    setNoPosition({ x: 0, y: 0 })
    setCelebrating(false)
    setExcitementCelebrating(false)
    setCandlesBlown(false)
    setOpenedGiftIds([])
    openedGiftIdsRef.current = new Set()
  }

  const selectProfile = (selectedProfile) => {
    clearScheduledScreens()
    resetInteractionState()
    setProfile(selectedProfile)
    setScreen('welcome')
  }

  const changePerson = () => {
    clearScheduledScreens()
    resetInteractionState()
    setProfile(null)
    setScreen('name-entry')
  }

  const openSurprise = () => {
    if (isOpening) return
    setIsOpening(true)
    setScreen('opening')
    scheduleScreen('waiting', 1100)
    scheduleScreen('question', 3000)
  }

  const noMessages = profile?.noMessages ?? [
    'Em ra babu, surprise vaddu antaava? 😂',
    'Sarle le, surprise nunchi escape avvalevu!',
    'Naaku telusu le nee buildup!',
    'Nice try... YES nokku! ❤️',
  ]

  const moveNoButton = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setNoPosition({
        x: Math.round(Math.random() * 90 - 45),
        y: Math.round(Math.random() * 54 - 27),
      })
    }
  }

  const handleNo = () => {
    setNoMessage(noMessages[noCountRef.current % noMessages.length])
    noCountRef.current += 1
    moveNoButton()
  }

  const handleYes = () => {
    if (celebrating) return
    setCelebrating(true)
    launchConfetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#dd7d70', '#f4b27e', '#fff4dc', '#87b6ce', '#e7998e'],
    })
    scheduleScreen('yes', 900)
    scheduleScreen('excitement', 2400)
  }

  const handleExcited = () => {
    if (excitementCelebrating) return
    setExcitementCelebrating(true)
    launchConfetti({
      particleCount: 150,
      spread: 100,
      startVelocity: 38,
      origin: { y: 0.6 },
      colors: ['#dd7d70', '#f4b27e', '#fff4dc', '#87b6ce', '#d98eaa'],
    })
    scheduleScreen('knew-it', 900)
    scheduleScreen('wish', 2400)
    scheduleScreen('cake', 4200)
  }

  const blowCandles = () => {
    if (candlesBlown) return
    setCandlesBlown(true)
    launchConfetti({
      particleCount: 180,
      spread: 105,
      startVelocity: 42,
      origin: { y: 0.58 },
      colors: ['#e8868a', '#f4bd83', '#fff2d6', '#84b7ca', '#d7a0bd', '#8dbb94'],
    })
    window.setTimeout(() => {
      launchConfetti({
        particleCount: 90,
        spread: 120,
        startVelocity: 28,
        origin: { y: 0.62 },
        colors: ['#e8868a', '#f4bd83', '#fff2d6', '#84b7ca', '#d7a0bd'],
      })
    }, 350)
  }

  const handleGiftOpened = (giftId) => {
    if (openedGiftIdsRef.current.has(giftId)) return

    const updatedGiftIds = new Set(openedGiftIdsRef.current).add(giftId)
    openedGiftIdsRef.current = updatedGiftIds
    setOpenedGiftIds([...updatedGiftIds])

    if (updatedGiftIds.size === profile.gifts.length) {
      launchConfetti({
        particleCount: 220,
        spread: 120,
        startVelocity: 44,
        origin: { y: 0.62 },
        colors: ['#de5e68', '#f0828d', '#ffd17d', '#fff0d6', '#d7a0bd'],
      })
      window.setTimeout(() => {
        launchConfetti({
          particleCount: 110,
          spread: 145,
          startVelocity: 30,
          origin: { y: 0.58 },
          colors: ['#de5e68', '#f0828d', '#ffd17d', '#fff0d6'],
        })
      }, 450)
    }
  }

  const replayExperience = () => {
    clearScheduledScreens()
    resetInteractionState()
    setScreen('welcome')
  }

  const hearts = [
    { left: '7%', top: '16%', size: 18, delay: 0 },
    { left: '14%', top: '72%', size: 14, delay: 1.2 },
    { left: '88%', top: '19%', size: 16, delay: 0.5 },
    { left: '92%', top: '68%', size: 20, delay: 2 },
    { left: '20%', top: '38%', size: 12, delay: 1.7 },
  ]

  return (
    <main className={`birthday-page ${screen === 'name-entry' ? 'birthday-page-name-entry' : ''} ${profile ? 'birthday-page-with-profile' : ''} ${screen === 'cake' ? 'birthday-page-cake' : ''} ${screen === 'memories' ? 'birthday-page-gallery' : ''} ${screen === 'gifts' ? 'birthday-page-gifts' : ''} ${screen === 'letter' ? 'birthday-page-letter' : ''} ${screen === 'finale' ? 'birthday-page-finale' : ''}`}>
      <div className="gingham-wash" aria-hidden="true" />
      {profile && screen !== 'name-entry' && (
        <motion.button
          type="button"
          className="change-person-button"
          onClick={changePerson}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <Users size={16} />
          Change person
        </motion.button>
      )}

      <div className="floating-decor" aria-hidden="true">
        {hearts.map((heart, index) => (
          <Heart
            key={index}
            className="floating-heart"
            style={{
              left: heart.left,
              top: heart.top,
              width: heart.size,
              height: heart.size,
              animationDelay: `${heart.delay}s`,
            }}
            fill="currentColor"
          />
        ))}
        <Sparkles className="corner-sparkles sparkles-one" />
        <Sparkles className="corner-sparkles sparkles-two" />
        <span className="tape tape-left" />
        <span className="tape tape-right" />
      </div>

      <motion.section
        className={`scrapbook-card ${screen === 'name-entry' ? 'name-entry-card' : ''}`}
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="doodle doodle-star star-one">✦</span>
        <span className="doodle doodle-star star-two">✧</span>
        <span className="doodle doodle-heart">♡</span>
        <span className="doodle doodle-flower">✿</span>

        <AnimatePresence mode="wait">
          {screen === 'name-entry' ? (
            <NameEntry key="name-entry" onSelect={selectProfile} />
          ) : screen === 'welcome' || screen === 'opening' ? (
            <motion.div
              key="welcome"
              className="welcome-content"
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                A LITTLE SURPRISE FOR {getDisplayName(profile).toUpperCase()}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.55 }}
              >
                {profile.welcomeHeading ?? <>Hey {getDisplayName(profile)}! <span aria-hidden="true">❤️</span></>}
              </motion.h1>

              <motion.p
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {profile.welcomeMessage}
              </motion.p>

              <motion.div
                className="envelope-wrap"
                initial={{ opacity: 0, scale: 0.86, rotate: -3 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: isOpening ? -8 : [0, -7, 0],
                }}
                transition={{
                  opacity: { delay: 0.72, duration: 0.45 },
                  scale: { delay: 0.72, duration: 0.45 },
                  y: isOpening
                    ? { duration: 0.4 }
                    : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <div className={`envelope ${isOpening ? 'is-open' : ''}`}>
                  <div className="letter-card">
                    <span className="mini-heart">♥</span>
                    <span className="letter-line">for you</span>
                    <span className="letter-sparkle">✦</span>
                  </div>
                  <div className="envelope-back" />
                  <div className="envelope-flap" />
                  <div className="envelope-front" />
                  <div className="heart-seal">
                    <Heart size={19} fill="currentColor" />
                  </div>
                </div>
              </motion.div>

              <motion.button
                type="button"
                className="surprise-button"
                onClick={openSurprise}
                disabled={isOpening}
                whileHover={{ y: -4, scale: 1.025 }}
                whileTap={{ y: 1, scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                <span>OPEN YOUR SURPRISE</span>
                <Gift size={20} strokeWidth={2.2} />
              </motion.button>

              <motion.p
                className="made-with-love"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Made with love by Sahithi <span aria-label="hand heart">🫰🏻</span>
              </motion.p>
            </motion.div>
          ) : screen === 'yes' ? (
            <motion.div
              key="yes"
              className="waiting-screen yes-screen"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 16 }}
            >
              <motion.div
                className="waiting-heart"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <Heart size={72} fill="currentColor" />
              </motion.div>
              <h2>Yesss! Naaku telusu le, YES antav ani! ❤️</h2>
            </motion.div>
          ) : screen === 'knew-it' ? (
            <motion.div
              key="knew-it"
              className="waiting-screen excited-message"
              initial={{ opacity: 0, scale: 0.65, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 12 }}
            >
              <Heart className="excited-heart" size={62} fill="currentColor" />
              <h2>Naaku telusu le nee buildup! 😂❤️</h2>
            </motion.div>
          ) : screen === 'wish' ? (
            <motion.div
              key="wish"
              className="waiting-screen wish-screen"
              initial={{ opacity: 0, y: 28, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 14 }}
            >
              <motion.span
                className="wish-cake"
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎂
              </motion.span>
              <h2>Sarle, ippudu oka wish koruko! 🎂</h2>
            </motion.div>
          ) : screen === 'cake' ? (
            <CakeScreen
              key="cake"
              profile={profile}
              isBlown={candlesBlown}
              onBlow={blowCandles}
              onContinue={() => setScreen('memories')}
            />
          ) : screen === 'memories' ? (
            <MemoriesGallery profile={profile} onContinue={() => setScreen('gifts')} />
          ) : screen === 'gifts' ? (
            <GiftsScreen
              profile={profile}
              openedGiftIds={openedGiftIds}
              onGiftOpened={handleGiftOpened}
              onContinue={() => setScreen('letter')}
            />
          ) : screen === 'letter' ? (
            <BirthdayLetterScreen
              profile={profile}
              onBack={() => setScreen('gifts')}
              onContinue={() => setScreen('finale')}
            />
          ) : screen === 'finale' ? (
            <BirthdayFinaleScreen key="finale" profile={profile} onReplay={replayExperience} />
          ) : screen === 'excitement' ? (
            <motion.div
              key="excitement"
              className="excitement-content"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                className="question-eyebrow"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                INKA OKA CHINNA MATTER... <span>❤️</span>
              </motion.p>
              <motion.h1
                className="excitement-heading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.28, type: 'spring', stiffness: 140 }}
              >
                {profile.excitementHeading}
              </motion.h1>
              <motion.div
                className="robot-stage excitement-robot"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0], rotate: [0, 2, 0, -2, 0] }}
                transition={{
                  opacity: { delay: 0.42 },
                  scale: { delay: 0.42 },
                  y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <span className="robot-sparkle robot-sparkle-one">✦</span>
                <span className="robot-sparkle robot-sparkle-two">✧</span>
                <RobotCat />
              </motion.div>
              <motion.p
                className="excitement-question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.62 }}
              >
                {profile.excitementNote}
              </motion.p>
              <div className="excitement-buttons">
                <motion.button
                  type="button"
                  className="yes-button excitement-yes"
                  onClick={handleExcited}
                  disabled={excitementCelebrating}
                  whileHover={{ y: -5, scale: 1.05, rotate: -1 }}
                  whileTap={{ y: 1, scale: 0.96 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
                >
                  YESSS! <span>❤️</span>
                </motion.button>
                <motion.button
                  type="button"
                  className="yes-button excitement-obvious"
                  onClick={handleExcited}
                  disabled={excitementCelebrating}
                  whileHover={{ y: -5, scale: 1.05, rotate: 1 }}
                  whileTap={{ y: 1, scale: 0.96 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.45 } }}
                >
                  OBVIOUSLY YES! <span>💗</span>
                </motion.button>
              </div>
            </motion.div>
          ) : screen === 'question' ? (
            <motion.div
              key="question"
              className="question-content"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                className="question-eyebrow"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                WAIT... {getDisplayName(profile).toUpperCase()}! <span>❤️</span>
              </motion.p>

              <motion.h1
                className="question-heading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
              >
                Birthday roju ila surprise vaste...
                <br />
                nee reaction enti? <span>🎂</span>
              </motion.h1>

              <motion.div
                className="robot-stage"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
                transition={{
                  opacity: { delay: 0.45 },
                  scale: { delay: 0.45 },
                  y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <span className="robot-sparkle robot-sparkle-one">✦</span>
                <span className="robot-sparkle robot-sparkle-two">✧</span>
                <RobotCat />
              </motion.div>

              <motion.p
                className="question-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
              >
                Nee surprise choodalani unda? ❤️
              </motion.p>
              {profile.questionNote && (
                <p className="profile-screen-note">{profile.questionNote}</p>
              )}

              <AnimatePresence mode="wait">
                {noMessage && (
                  <motion.p
                    key={noMessage}
                    className="no-message"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: -8, rotate: -3 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                  >
                    {noMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="question-buttons">
                <motion.button
                  type="button"
                  className="yes-button"
                  onClick={handleYes}
                  disabled={celebrating}
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ y: 1, scale: 0.96 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                >
                  YESSS! <span>❤️</span>
                </motion.button>
                <motion.button
                  type="button"
                  className="no-button"
                  onClick={handleNo}
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                  whileTap={{ scale: 0.94 }}
                >
                  NOOO! <span>🙄</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              className="waiting-screen"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 16 }}
            >
              <motion.div
                className="waiting-heart"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <Heart size={72} fill="currentColor" />
              </motion.div>
              <h2>Nee surprise ready ga wait chesthundi... ❤️</h2>
              <p>Inka konchem magic nee daggariki vasthundi.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </main>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BirthdayExperience />
    </MotionConfig>
  )
}

export default App
