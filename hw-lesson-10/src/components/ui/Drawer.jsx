import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useId } from 'react';
import { createPortal } from 'react-dom';

const FOCUS_SELECTOR =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

function getFocusable(root) {
  if (!root) return [];
  return Array.from(root.querySelectorAll(FOCUS_SELECTOR))
    .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
}

let scrollLocks = 0;
function lockBodyScroll() {
  if (scrollLocks === 0) {
    document.documentElement.style.overflow = 'hidden';
  }
  scrollLocks++;
}
function unlockBodyScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) {
    document.documentElement.style.overflow = '';
  }
}

/**
 * Accessible, focus-trapping Drawer (left side)
 */
export default function Drawer({
  open,
  onClose,
  title,
  children,
  theme = 'light',
  initialFocusRef
}) {
  const panelRef = useRef(null);
  const lastActiveRef = useRef(null);
  const backdropRef = useRef(null);
  const titleId = useId();

  // мемо-классы, зависят только от theme
  const cls = useMemo(() => {
    const isDark = theme === 'dark';
    return {
      backdrop: isDark ? 'bg-black/70' : 'bg-black/50',
      panelBg: isDark ? 'bg-neutral-900' : 'bg-white',
      headerBg: isDark ? 'bg-neutral-800' : 'bg-neutral-50',
      border: isDark ? 'border-neutral-700' : 'border-neutral-200',
      text: isDark ? 'text-neutral-100' : 'text-neutral-900',
      closeText: isDark ? 'text-neutral-300' : 'text-neutral-600',
      closeHover: isDark ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200',
      contentBg: isDark ? 'bg-neutral-900' : 'bg-white'
    };
  }, [theme]);

  useLayoutEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement;
    lockBodyScroll();

    const root = document.getElementById('root') || document.body;
    const prevInert = root.inert;
    try { root.inert = true; } catch {}

    const focusTarget =
      initialFocusRef?.current ||
      getFocusable(panelRef.current)[0] ||
      panelRef.current;
    focusTarget?.focus({ preventScroll: true });

    return () => {
      unlockBodyScroll();
      try { root.inert = prevInert; } catch {}
      lastActiveRef.current && lastActiveRef.current.focus?.();
    };
  }, [open, initialFocusRef]);

  // ESC + focus trap
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose?.();
      return;
    }
    if (e.key !== 'Tab') return;

    const nodes = getFocusable(panelRef.current);
    if (nodes.length === 0) {
      e.preventDefault();
      panelRef.current?.focus();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault(); first.focus();
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const handler = (ev) => onKeyDown(ev);
    document.addEventListener('keydown', handler, true);
    return () => document.removeEventListener('keydown', handler, true);
  }, [open, onKeyDown]);

  const onBackdropPointerDown = useCallback((e) => {
    if (e.target === backdropRef.current) onClose?.();
  }, [onClose]);

  if (!open) return null;

  const portalHost = document.getElementById('portal-root') || document.body;

  return createPortal(
    <div className="fixed inset-0 z-50" aria-hidden={false}>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className={`absolute inset-0 ${cls.backdrop} backdrop-blur-[1px] opacity-100 animate-fadeIn`}
        onMouseDown={onBackdropPointerDown}
        onTouchStart={onBackdropPointerDown}
        data-testid="drawer-backdrop"
        aria-hidden="true"
        style={{ overscrollBehavior: 'contain' }}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        className={[
          'absolute inset-y-0 start-0 w-full max-w-xs',
          cls.panelBg,
          'shadow-xl outline-none translate-x-0 animate-slideIn flex flex-col',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          'border-r', cls.border
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        <div className={`flex items-center justify-between px-4 py-3 border-b ${cls.border} ${cls.headerBg}`}>
          {title
            ? <h2 id={titleId} className={`font-medium text-sm ${cls.text}`}>{title}</h2>
            : <span className={`text-sm font-medium ${cls.text}`}>Menu</span>}
          <button
            type="button"
            onClick={onClose}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md ${cls.closeText} ${cls.closeHover} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
            aria-label="Close menu"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className={`p-4 flex-1 overflow-y-auto ${cls.contentBg}`} data-testid="drawer-content">
          {children}
        </div>
      </aside>
    </div>,
    portalHost
  );
}
