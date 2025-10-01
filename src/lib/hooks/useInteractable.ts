import { useEffect } from "react";
import interact from "interactjs";

interface UseInteractableProps {
  ref: React.RefObject<HTMLDivElement | null>;
  windowId: string;
  x: number;
  y: number;
  setWindowPosition: (id: string, x: number, y: number) => void;
  setWindowSize: (id: string, width: number, height: number) => void;
}

export function useInteractable({
  ref,
  windowId,
  x,
  y,
  setWindowPosition,
  setWindowSize,
}: UseInteractableProps) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Draggable
    interact(element).draggable({
      allowFrom: ".cursor-move",
      listeners: {
        move(event) {
          const target = event.target as HTMLElement;
          const dx =
            (parseFloat(target.getAttribute("data-x") || "0") || 0) + event.dx;
          const dy =
            (parseFloat(target.getAttribute("data-y") || "0") || 0) + event.dy;

          target.style.transform = `translate(${dx}px, ${dy}px)`;
          target.setAttribute("data-x", dx.toString());
          target.setAttribute("data-y", dy.toString());
        },
        end(event) {
          const target = event.target as HTMLElement;
          const finalX = parseFloat(target.getAttribute("data-x") || "0") || 0;
          const finalY = parseFloat(target.getAttribute("data-y") || "0") || 0;

          setWindowPosition(windowId, x + finalX, y + finalY);

          target.style.transform = "translate(0px, 0px)";
          target.setAttribute("data-x", "0");
          target.setAttribute("data-y", "0");
        },
      },
    });

    // Resizable
    interact(element).resizable({
      edges: { left: true, right: true, bottom: true },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 300, height: 200 },
        }),
      ],
      listeners: {
        move(event) {
          const target = event.target as HTMLElement;

          target.style.width = `${event.rect.width}px`;
          target.style.height = `${event.rect.height}px`;

          const dx =
            parseFloat(target.getAttribute("data-x") || "0") +
            event.deltaRect.left;
          const dy =
            parseFloat(target.getAttribute("data-y") || "0") +
            event.deltaRect.top;

          target.style.transform = `translate(${dx}px, ${dy}px)`;
          target.setAttribute("data-x", dx.toString());
          target.setAttribute("data-y", dy.toString());
        },
        end(event) {
          const target = event.target as HTMLElement;

          const dx = parseFloat(target.getAttribute("data-x") || "0") || 0;
          const dy = parseFloat(target.getAttribute("data-y") || "0") || 0;
          const width = event.rect.width;
          const height = event.rect.height;

          setWindowPosition(windowId, x + dx, y + dy);
          setWindowSize(windowId, width, height);

          target.setAttribute("data-x", "0");
          target.setAttribute("data-y", "0");
          target.style.transform = "translate(0px, 0px)";
        },
      },
    });

    return () => {
      interact(element).unset();
    };
  }, [ref, windowId, x, y, setWindowPosition, setWindowSize]);
}
