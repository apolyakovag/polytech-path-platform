export const DREAM_TEAM_DRAG_MIME = "application/x-dream-team-drag";

export type DreamTeamDragPayload =
  | { from: "stock"; leaderId: string }
  | {
      from: "cell";
      moduleId: string;
      slotIndex: number;
      leaderId: string;
    };

export function writeDragPayload(
  dataTransfer: DataTransfer,
  payload: DreamTeamDragPayload
) {
  dataTransfer.setData(DREAM_TEAM_DRAG_MIME, JSON.stringify(payload));
  dataTransfer.effectAllowed = "move";
}

export function readDragPayload(
  dataTransfer: DataTransfer
): DreamTeamDragPayload | null {
  const raw = dataTransfer.getData(DREAM_TEAM_DRAG_MIME);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DreamTeamDragPayload;
  } catch {
    return null;
  }
}

export function acceptsDreamTeamDrag(dataTransfer: DataTransfer): boolean {
  return dataTransfer.types.includes(DREAM_TEAM_DRAG_MIME);
}
