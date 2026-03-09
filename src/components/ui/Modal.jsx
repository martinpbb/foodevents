import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div data-cy="modal" className="modal" role="dialog" aria-modal="true" aria-label={title || "Dialog"}>
      <div className="modalBackdrop" onClick={onClose} aria-hidden="true" />
      <div className="modalPanel">
        <div className="modalHead">
          <div data-cy="modal-title" className="modalTitle">{title}</div>
          <button data-cy="modal-close" className="iconBtn" type="button" onClick={onClose} aria-label="Zavrit">
            x
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>,
    document.body
  );
}
